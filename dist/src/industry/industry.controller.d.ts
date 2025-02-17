import { IndustryService } from './industry.service';
import { CreateIndustryRequestDto } from './dto/create-industry.request.dto';
import { UpdateIndustryRequestDto } from './dto/update-industry.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { IAuthedUser } from '@/auth/types';
export declare class IndustryController {
    private readonly industryService;
    constructor(industryService: IndustryService);
    createIndustry(authedUser: IAuthedUser, body: CreateIndustryRequestDto): Promise<SuccessResponseObject>;
    updateIndustry(authedUser: IAuthedUser, id: number, body: UpdateIndustryRequestDto): Promise<SuccessResponseObject>;
    getIndustrys(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getIndustry(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteIndustry(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
