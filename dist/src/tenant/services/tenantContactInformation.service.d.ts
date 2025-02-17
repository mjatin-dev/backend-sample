import { TenantContactInformationRepository } from '../repositories/tenantContactInformation.repository';
import { TenantContactInfoCreationAttributes, TenantContactInfoUpdateAttributes } from '../types';
export declare class TenantContactInformationService {
    private readonly accountContactInformationRepository;
    constructor(accountContactInformationRepository: TenantContactInformationRepository);
    create(data: TenantContactInfoCreationAttributes): Promise<import("../entities/tenantContactInformation.entity").TenantContactInformation>;
    update(id: number, data: TenantContactInfoUpdateAttributes): Promise<void>;
}
