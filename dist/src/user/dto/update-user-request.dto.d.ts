import { UserType } from '../types';
export declare class UpdateUserRequestDto {
    userName?: string;
    userEmail?: string;
    userType?: UserType;
    tenantId?: number;
    phoneNumber?: string;
    mobileNumber?: string;
}
