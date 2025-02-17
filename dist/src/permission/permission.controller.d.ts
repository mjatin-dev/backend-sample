import { PermissionService } from './permission.service';
import { CreatePermissionRequestDto } from './dto/create-permission.request.dto';
import { UpdatePermissionRequestDto } from './dto/update-permission.request.dto';
import { SuccessResponseObject } from '../common/http';
import { IAuthedUser } from '@/auth/types';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    createPermission(authedUser: IAuthedUser, body: CreatePermissionRequestDto): Promise<SuccessResponseObject>;
    updatePermission(authedUser: IAuthedUser, id: number, body: UpdatePermissionRequestDto): Promise<SuccessResponseObject>;
    getPermissions(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getPermission(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deletePermission(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
