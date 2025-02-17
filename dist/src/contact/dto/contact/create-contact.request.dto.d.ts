import { ContactInfoDto } from '@/user/dto/create-contactInfo.request.dto';
import { ContactType } from '../../types';
export declare class CreateContactRequestDto {
    firstName: string;
    middleName?: string;
    lastName: string;
    title: string;
    contactRole: string;
    contactType: ContactType;
    contactStageId?: number;
    contactInfo: ContactInfoDto;
}
