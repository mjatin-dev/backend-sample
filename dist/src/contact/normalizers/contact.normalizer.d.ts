import { ContactResponseDto } from '../dto/contact/contact.response.dto';
import { Contact } from '../entities/contact.entity';
export declare const contactNormalizer: {
    getContactResponseDto(contact: Contact): ContactResponseDto;
};
