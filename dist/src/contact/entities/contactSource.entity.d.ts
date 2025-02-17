import { Contact } from './contact.entity';
export declare class ContactSource {
    contactSourceId: number;
    contactSourceName: string;
    description: string;
    contact?: Contact[];
}
