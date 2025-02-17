import { User } from '@/user/entities/user.entity';
import { TenantUserJobRole } from './tenantUserJobRole.entity';
export declare class JobRoleForTenantUser {
    jobRoleForTenantUserId: number;
    userId: number;
    tenantUserJobRoleId: number;
    isCurrent: boolean;
    startDate: Date;
    endDate?: Date;
    user?: User;
    tenantUserJobRole?: TenantUserJobRole;
}
