import { ContactInfoDto } from '@/user/dto/create-contactInfo.request.dto';
export declare class CreateTenantRequestDto {
    tenantName: string;
    contactInfo: ContactInfoDto;
    billingContactInfo: ContactInfoDto;
    ownerName: string;
    ownerEmail: string;
}
