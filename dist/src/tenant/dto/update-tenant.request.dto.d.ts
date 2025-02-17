import { UpdateContactInfoDto } from '@/user/dto/update-contactInfo.request.dto';
export declare class UpdateTenantRequestDto {
    tenantName: string;
    userName?: string;
    userEmail?: string;
    contactInfo: UpdateContactInfoDto;
    billingContactInfo: UpdateContactInfoDto;
}
