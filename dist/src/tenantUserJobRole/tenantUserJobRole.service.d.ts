import { CreateTenantUserJobRoleRequestDto } from './dto/create-tenantUserJobRole.request.dto';
import { TenantUserJobRoleResponseDto } from './dto/tenantUserJobRole.response.dto';
import { UpdateTenantUserJobRoleRequestDto } from './dto/update-tenantUserJobRole.request.dto';
import { TenantUserJobRoleRepository } from './repositories/tenantUserJobRole.repository';
export declare class TenantUserJobRoleService {
    private readonly tenantUserJobRoleRepository;
    constructor(tenantUserJobRoleRepository: TenantUserJobRoleRepository);
    create(data: CreateTenantUserJobRoleRequestDto, ownerId: number): Promise<TenantUserJobRoleResponseDto>;
    findOne(id: number, ownerId: number): Promise<TenantUserJobRoleResponseDto>;
    update(id: number, data: UpdateTenantUserJobRoleRequestDto, ownerId: number): Promise<TenantUserJobRoleResponseDto>;
    findAll(userId: number): Promise<TenantUserJobRoleResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
