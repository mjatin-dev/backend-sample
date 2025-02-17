import { CreatePermissionRequestDto } from './dto/create-permission.request.dto';
import { PermissionResponseDto } from './dto/permission.response.dto';
import { UpdatePermissionRequestDto } from './dto/update-permission.request.dto';
import { PermissionRepository } from './permission.repository';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: PermissionRepository);
    create(data: CreatePermissionRequestDto, ownerId: number): Promise<PermissionResponseDto>;
    findOne(id: number, ownerId: number): Promise<PermissionResponseDto>;
    update(id: number, data: UpdatePermissionRequestDto, ownerId: number): Promise<PermissionResponseDto>;
    findAll(userId: number): Promise<PermissionResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
