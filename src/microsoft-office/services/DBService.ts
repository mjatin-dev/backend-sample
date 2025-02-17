import { Migration } from '../dtos/migration.dto';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';

export type IntegrationState<TokenSchema = any, MetaSchema = any> = {
  id: string;
  created_at: string;
  updated_at: string;
  integration_id: string;
  tenant_id: string;
  user_id: string;
  session: {
    email: string;
    tokens: TokenSchema;
    meta: MetaSchema;
  };
};

export class DBService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  public async updateIntegrationAccessToken(sessionRow: any) {
    await this.connection.query(
      `
      UPDATE public.integration_state
        SET session = $1, updated_at=now()
        WHERE id=$2
    `,
      [sessionRow.session, sessionRow.id],
    );
  }

  public async getTableMigrationName(tenantId: string, dataSourceId: string) {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    return await this.connection.query(
      `select * from ${schemaName}.schema_tables tab`,
    );
  }

  public async getUser(cognitoUserId: string) {
    const res = await this.connection.query(
      `select * from "user" where user_cognito_id = $1`,
      [cognitoUserId],
    );
    return res.rows[0];
  }

  public async getMigration(tenantId: string, migrationId: string) {
    const res = await this.connection.query(
      `select * from "data_migration" where tenant_id = $1 and 
      data_migration_id = $2`,
      [tenantId, migrationId],
    );
    return res.rows[0];
  }

  public async getMigrationById(migrationId: string) {
    const res = await this.connection.query(
      `select * from "data_migration" 
      where data_migration_id = $1`,
      [migrationId],
    );
    console.log(res);
    if (res?.length === 0) {
      throw new Error('Migration not found');
    }
    return res[0] as Migration;
  }

  public async getIntegrationSessionByUser<T = any>(
    userId: string,
    dataSourceId: string,
  ): Promise<IntegrationState<T>> {
    const integrationSessions = await this.connection.query(
      `select is2.*
      from data_source ds
      inner join integration i on i.application_id  = ds.integration_id 
      inner join integration_state is2 on i.id  = is2.integration_id 
      where is2.user_id = $1 and ds.data_source_id = $2`,
      [userId, dataSourceId],
    );

    if (integrationSessions.rowCount <= 0) {
      throw new Error('Integrations Sessions not found!');
    }
    return integrationSessions[0];
  }
}

export default DBService;
