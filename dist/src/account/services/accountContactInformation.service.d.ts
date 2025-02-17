import { AccountContactInformationRepository } from '../repositories/accountContactInformation.repository';
import { AccountContactInfoCreationAttributes, AccountContactInfoUpdateAttributes } from '../types';
export declare class AccountContactInformationService {
    private readonly accountContactInformationRepository;
    constructor(accountContactInformationRepository: AccountContactInformationRepository);
    create(data: AccountContactInfoCreationAttributes): Promise<import("../entities/accounttContactInformation.entity").AccountContactInformation>;
    update(id: number, data: AccountContactInfoUpdateAttributes): Promise<void>;
}
