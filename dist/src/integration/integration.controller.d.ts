import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { ICallbackQueryParams, AppIds } from '@/core/types';
import { IntegrationService } from './integration.service';
export declare class IntegrationController {
    private integrationService;
    constructor(integrationService: IntegrationService);
    list(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getIntegration(authedUser: IAuthedUser, appId: AppIds): Promise<SuccessResponseObject>;
    authorize(authedUser: IAuthedUser, appId: AppIds, optionalArgs: any): Promise<SuccessResponseObject>;
    uninstall(authedUser: IAuthedUser, appId: AppIds): Promise<SuccessResponseObject>;
    handleAuthCallback(authedUser: IAuthedUser, appId: AppIds, query: ICallbackQueryParams): Promise<SuccessResponseObject>;
    validateAuthorization(authedUser: IAuthedUser, appId: AppIds): Promise<import("./integration.entity").Integration>;
}
