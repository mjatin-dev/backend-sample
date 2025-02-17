import { ContactType } from '../../types';
export declare class UpdateContactRequestDto {
    firstName: string;
    middleName?: string;
    lastName: string;
    title: string;
    contactType: ContactType;
    contactRole: string;
    email: string;
    secondaryEmail?: string;
    contactStageId?: number;
    contactStatusId?: number;
    contactSourceId?: number;
    accountId?: number;
    mobileNumber: string;
    phoneNumber: string;
    street: string;
    city: string;
    addressState: string;
    zip: string;
    country: string;
}
