import { AddressType } from '@/user/types';
import { User } from './user.entity';
export declare class UserContactInformation {
    userContInfoId: number;
    userId: number;
    addressType: AddressType;
    isCurrent: boolean;
    startValidDate: Date;
    endValidDate?: Date;
    phoneNumber?: string;
    mobileNumber?: string;
    country?: string;
    zip?: string;
    addressState?: string;
    city?: string;
    street?: string;
    email?: string;
    user: User;
}
