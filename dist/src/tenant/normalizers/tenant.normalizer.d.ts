import { Tenant } from '@/tenant/entities/tenant.entity';
import { TenantResponseDto } from '../dto/tenant.response.dto';
export declare const tenantNormalizer: {
    getTenantResponseDto(tenant: Tenant): TenantResponseDto;
};
