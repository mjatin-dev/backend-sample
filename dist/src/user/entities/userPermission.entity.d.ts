import { Permission } from '@/permission/permission.entity';
import { User } from './user.entity';
export declare class UserPermission {
    tenantUserPermissionId: number;
    userId: number;
    permissionId: number;
    isCurrentPermssion: boolean;
    startDate: Date;
    endDate?: Date;
    user: User;
    permission: Permission;
}
