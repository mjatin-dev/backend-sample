import { DeleteResult } from 'typeorm';
import { CreateTenantRequestDto } from '../dto/create-tenant.request.dto';
import { UpdateTenantRequestDto } from '../dto/update-tenant.request.dto';
import { TenantResponseDto } from '../dto/tenant.response.dto';
import { UserService } from '@/user/services/user.service';
import { TenantRepository } from '../repositories/tenant.repository';
import { AuthService } from '@/auth/auth.service';
import { TenantContactInformationService } from './tenantContactInformation.service';
import { CreateUserResponseDto } from '@/user/dto/create-user.response.dto';
export declare class TenantService {
    private readonly tenantRepository;
    private readonly userService;
    private readonly authService;
    private readonly tenantContactInfoService;
    constructor(tenantRepository: TenantRepository, userService: UserService, authService: AuthService, tenantContactInfoService: TenantContactInformationService);
    create(data: CreateTenantRequestDto, existingUser?: CreateUserResponseDto): Promise<TenantResponseDto>;
    findOne(id: number): Promise<TenantResponseDto>;
    findAll(): Promise<TenantResponseDto[]>;
    remove(id: number): Promise<DeleteResult>;
    update(id: number, data: UpdateTenantRequestDto): Promise<void>;
    delete(id: number): Promise<void>;
}
