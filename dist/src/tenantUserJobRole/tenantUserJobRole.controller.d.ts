import { TenantUserJobRoleService } from './tenantUserJobRole.service';
import { CreateTenantUserJobRoleRequestDto } from './dto/create-tenantUserJobRole.request.dto';
import { UpdateTenantUserJobRoleRequestDto } from './dto/update-tenantUserJobRole.request.dto';
import { SuccessResponseObject } from '../common/http';
import { IAuthedUser } from '@/auth/types';
export declare class TenantUserJobRoleController {
    private readonly tenantUserJobRoleService;
    constructor(tenantUserJobRoleService: TenantUserJobRoleService);
    createTenantUserJobRole(authedUser: IAuthedUser, body: CreateTenantUserJobRoleRequestDto): Promise<SuccessResponseObject>;
    updateTenantUserJobRole(authedUser: IAuthedUser, id: number, body: UpdateTenantUserJobRoleRequestDto): Promise<SuccessResponseObject>;
    getTenantUserJobRoles(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getTenantUserJobRole(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteTenantUserJobRole(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
