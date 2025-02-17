import { Client, ClientOptions } from '@microsoft/microsoft-graph-client';
import { MyAuthenticationProvider } from './MSCustomAuthProvider';
import { IntegrationState } from './DBService';

export type TokenSchema = {
  accessToken: string;
  refreshToken: string;
};

export class MicrosoftGraphApiService {
  private client: Client;
  constructor(
    private accessToken: string,
    private refreshToken: string,
    private sessionRow: IntegrationState<TokenSchema, any>,
  ) {
    const authProvider = new MyAuthenticationProvider(
      this.accessToken,
      this.refreshToken,
      this.sessionRow,
    );

    const clientOptions: ClientOptions = {
      authProvider: authProvider,
      fetchOptions: {
        headers: { Prefer: 'IdType="ImmutableId"' },
      },
    };

    this.client = Client.initWithMiddleware(clientOptions);
  }

  getDataByResourceAndId(resource: string, id: string) {
    let params = '';
    if (resource === 'messages') {
      params =
        '?$expand=attachments($select=id,lastModifiedDateTime,name,contentType,size,isInline)';
    }
    return this.client.api(`/me/${resource}/${id}${params}`).get();
  }

  getData(table: string, url: string) {
    if (table === 'message') {
      return this.getMessages(url);
    }
    if (table === 'event') {
      return this.getEvents(url);
    }
  }

  getMe() {
    return this.client.api('/me').get();
  }

  getMessages(url?: string) {
    let calculatedUrl = '';
    if (!url) {
      calculatedUrl = '/me/messages?$top=1000';
    } else {
      calculatedUrl = url;
    }
    return this.client.api(calculatedUrl).get();
  }

  getAttachment(resource: string, attachmentId: string, resourceId: string) {
    const url = `/me/${resource}/${resourceId}/attachments/${attachmentId}`;

    return this.client.api(url).get();
  }
  getEvents(url?: string) {
    let calculatedUrl = '';
    if (!url) {
      calculatedUrl = '/me/events?$top=1000';
    } else {
      calculatedUrl = url;
    }
    return this.client.api(calculatedUrl).get();
  }

  subscribeToMessageChangesWebHook(migrationId: string) {
    return this.client.api('/subscriptions').post({
      changeType: 'created,updated,deleted',
      notificationUrl: `${process.env.MS_WEBHOOK_URL}/changes`,
      lifecycleNotificationUrl: `${process.env.MS_WEBHOOK_URL}/lifecycle`,
      resource: '/me/messages',
      clientState: JSON.stringify({ migrationId, type: 'messages' }),
      expirationDateTime: new Date(Date.now() + 86400000).toISOString(),
    });
  }

  subscribeToEventChangesWebHook(migrationId: string) {
    return this.client.api('/subscriptions').post({
      changeType: 'created,updated,deleted',
      notificationUrl: `${process.env.MS_WEBHOOK_URL}/changes`,
      lifecycleNotificationUrl: `${process.env.MS_WEBHOOK_URL}/lifecycle`,
      resource: '/me/events',
      clientState: JSON.stringify({ migrationId, type: 'events' }),
      expirationDateTime: new Date(Date.now() + 86400000).toISOString(),
    });
  }
}
