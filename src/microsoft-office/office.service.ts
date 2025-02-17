import { Injectable } from '@nestjs/common';
import { MicrosoftGraphApiService } from './services/MicrosoftGraphApi.service';
import { KmsManagerService } from './services/kmsService';
import DBService, { type IntegrationState } from './services/DBService';

export type TokenSchema = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class OfficeService {
  constructor(
    private readonly graphApiService: MicrosoftGraphApiService,
    private readonly kmsService: KmsManagerService,
    private readonly dbService: DBService,
  ) {}

  public async getAttachmentDownloadLink(
    migrationId: string,
    attachmentId: string,
    messageId: string,
  ) {
    const migration = await this.dbService.getMigrationById(migrationId);
    const { data_source_id, user_id } = migration;

    const sessionRow =
      await this.dbService.getIntegrationSessionByUser<TokenSchema>(
        user_id,
        data_source_id,
      );
    const { accessToken, refreshToken } = await this.decryptSessionTokens(
      sessionRow,
    );

    const client = new MicrosoftGraphApiService(
      accessToken,
      refreshToken,
      sessionRow,
    );
    try {
      const attachment = await client.getAttachment(
        'messages',
        attachmentId,
        messageId,
      );

      return attachment;
    } catch (error) {
      console.dir(error, { depth: 50 });
    }
  }

  private async decryptSessionTokens(
    sessionRow: IntegrationState<TokenSchema, any>,
  ) {
    const { accessToken, refreshToken } = sessionRow.session.tokens;
    const decryptedAccessToken = await this.kmsService.decrypt(accessToken);
    const decryptedRefreshToken = await this.kmsService.decrypt(refreshToken);
    return {
      accessToken: decryptedAccessToken,
      refreshToken: decryptedRefreshToken,
    };
  }
}
