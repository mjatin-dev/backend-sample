import { TenantService } from './services/tenant.service';
import { CreateTenantRequestDto } from './dto/create-tenant.request.dto';
import { SuccessResponseObject } from '../common/http';
import { UpdateTenantRequestDto } from './dto/update-tenant.request.dto';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    createTenant(body: CreateTenantRequestDto): Promise<SuccessResponseObject>;
    getCompanies(): Promise<SuccessResponseObject>;
    getTenant(id: number): Promise<SuccessResponseObject>;
    updateTenant(id: number, body: UpdateTenantRequestDto): Promise<SuccessResponseObject>;
    deleteTenant(id: number): Promise<SuccessResponseObject>;
}
