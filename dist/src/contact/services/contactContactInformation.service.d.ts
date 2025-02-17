import { ContactContactInformationRepository } from '../repositories/contactContactInformation.repository';
import { ContactContactInfoCreationAttributes, ContactContactInfoUpdateAttributes } from '../types';
export declare class ContactContactInformationService {
    private readonly userContactInformationRepository;
    constructor(userContactInformationRepository: ContactContactInformationRepository);
    create(data: ContactContactInfoCreationAttributes): Promise<import("../entities/contactContactInformation.entity").ContactContactInformation>;
    update(id: number, data: ContactContactInfoUpdateAttributes): Promise<void>;
}
