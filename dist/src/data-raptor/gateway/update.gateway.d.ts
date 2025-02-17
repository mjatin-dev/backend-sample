import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class UpdateGateway implements OnGatewayConnection, OnGatewayDisconnect {
    handleDisconnect(client: Socket): void;
    server: Server;
    handleConnection(client: Socket, ...args: any[]): void;
    handleJoinTenantUpdatesGroup(client: Socket): Promise<string>;
    handleTenantScoreTableUpdate(client: Socket, incomingPayload: string): Promise<string>;
}
