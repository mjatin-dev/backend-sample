import { JobRoleForTenantUser } from './jobRoleForTenantUser.entity';
export declare class TenantUserJobRole {
    tenantUserJobRoleId: number;
    title: string;
    code: string;
    description: string;
    jobRoleForTenantUsers?: JobRoleForTenantUser[];
}
