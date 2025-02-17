import { UserContactInformationRepository } from '../repositories/userContactInformation.repository';
import { UserContactInfoCreationAttributes, UserContactInfoUpdateAttributes } from '../types';
export declare class UserContactInformationService {
    private readonly userContactInformationRepository;
    constructor(userContactInformationRepository: UserContactInformationRepository);
    create(data: UserContactInfoCreationAttributes): Promise<import("../entities/userContactInformation.entity").UserContactInformation>;
    update(id: number, data: UserContactInfoUpdateAttributes): Promise<void>;
}
