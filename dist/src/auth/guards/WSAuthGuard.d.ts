import { ExecutionContext } from '@nestjs/common';
declare const WSAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class WSAuthGuard extends WSAuthGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
