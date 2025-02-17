import { Contact } from './contact.entity';
export declare class ContactStatus {
    contactStatusId: number;
    contactStatusName: string;
    description: string;
    contact?: Contact[];
}
