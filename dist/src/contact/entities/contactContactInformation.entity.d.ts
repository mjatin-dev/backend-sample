import { AddressType } from '@/user/types';
import { Contact } from './contact.entity';
export declare class ContactContactInformation {
    contactContInfoId: number;
    contactId?: number;
    addressType?: AddressType;
    isCurrent?: boolean;
    startValidDate?: Date;
    endValidDate?: Date;
    phoneNumber: string;
    mobileNumber?: string;
    country: string;
    zip: string;
    addressState: string;
    city: string;
    street: string;
    email: string;
    contact: Contact;
}
