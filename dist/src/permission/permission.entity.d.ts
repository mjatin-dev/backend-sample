import { UserPermission } from '@/user/entities/userPermission.entity';
export declare class Permission {
    permissionId: number;
    title: string;
    code: string;
    description: string;
    userPermissions: UserPermission[];
}
