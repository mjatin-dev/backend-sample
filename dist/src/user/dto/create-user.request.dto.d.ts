import { UserType } from '../types';
export declare class CreateUserRequestDto {
    userName: string;
    userEmail: string;
    userType: UserType;
    phoneNumber: string;
    mobileNumber?: string;
    profileJobRole?: string;
}
