import { ContactInfoDto } from '@/user/dto/create-contactInfo.request.dto';
export declare class CreateAccountRequestDto {
    accountName: string;
    description: string;
    revenuePerYear: number;
    accountTypeId: number;
    contactInfo: ContactInfoDto;
}
