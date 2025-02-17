import { ProfileRepository } from './profile.repository';
import { ProfileCreationAttributes, ProfileUpdateAttributes } from './types';
export declare class ProfileService {
    private readonly profileRepository;
    constructor(profileRepository: ProfileRepository);
    create(data: ProfileCreationAttributes): Promise<import("./profile.entity").Profile>;
    update(id: number, data: ProfileUpdateAttributes): Promise<void>;
}
