"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const WSAuthGuard_1 = require("../../auth/guards/WSAuthGuard");
var WS_SERVER_EVENTS;
(function (WS_SERVER_EVENTS) {
    WS_SERVER_EVENTS["JOIN_TENANT_GROUP"] = "join-tenant-updates-group";
    WS_SERVER_EVENTS["TENANT_UPDATE_EVENT"] = "tenant-update";
})(WS_SERVER_EVENTS || (WS_SERVER_EVENTS = {}));
var WS_CLIENT_EVENTS;
(function (WS_CLIENT_EVENTS) {
    WS_CLIENT_EVENTS["GROUP_JOINED"] = "group-joined";
})(WS_CLIENT_EVENTS || (WS_CLIENT_EVENTS = {}));
const TENANT_UPDATE_EVENT_PREFIX = 'tenant-updates';
let UpdateGateway = class UpdateGateway {
    handleDisconnect(client) {
        console.log('Web socket client disconnected:', client.id);
    }
    handleConnection(client, ...args) {
        console.log('connection received', client.handshake.headers);
        console.log('total connection', this.server.sockets.sockets.size);
    }
    async handleJoinTenantUpdatesGroup(client) {
        const handshake = client.handshake;
        const user = handshake.user;
        console.log(`${WS_SERVER_EVENTS.JOIN_TENANT_GROUP} received:::`, `User: ${user.userId}, Tenant: ${user.tenantId}`);
        const groupName = `${TENANT_UPDATE_EVENT_PREFIX}-${user.tenantId}`;
        client.join(groupName);
        client.emit(WS_CLIENT_EVENTS.GROUP_JOINED, { groupName });
        return 'ok';
    }
    async handleTenantScoreTableUpdate(client, incomingPayload) {
        console.log(`${WS_SERVER_EVENTS.TENANT_UPDATE_EVENT} received:::`, incomingPayload);
        const payload = typeof incomingPayload === 'string'
            ? JSON.parse(incomingPayload)
            : incomingPayload;
        const groupName = `${TENANT_UPDATE_EVENT_PREFIX}-${payload.tenantId}`;
        this.server
            .to(groupName)
            .emit(WS_SERVER_EVENTS.TENANT_UPDATE_EVENT, payload);
        return 'ok';
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UpdateGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(WSAuthGuard_1.WSAuthGuard),
    (0, websockets_1.SubscribeMessage)(WS_SERVER_EVENTS.JOIN_TENANT_GROUP),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], UpdateGateway.prototype, "handleJoinTenantUpdatesGroup", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(WS_SERVER_EVENTS.TENANT_UPDATE_EVENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], UpdateGateway.prototype, "handleTenantScoreTableUpdate", null);
UpdateGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], UpdateGateway);
exports.UpdateGateway = UpdateGateway;
//# sourceMappingURL=update.gateway.js.map