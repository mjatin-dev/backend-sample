import { DealService } from './deal.service';
import { CreateDealRequestDto } from './dto/create-deal.request.dto';
import { UpdateDealRequestDto } from './dto/update-deal.request.dto';
import { SuccessResponseObject } from '../common/http';
import { IAuthedUser } from '@/auth/types';
export declare class DealController {
    private readonly dealService;
    constructor(dealService: DealService);
    createDeal(authedUser: IAuthedUser, body: CreateDealRequestDto): Promise<SuccessResponseObject>;
    updateDeal(authedUser: IAuthedUser, id: number, body: UpdateDealRequestDto): Promise<SuccessResponseObject>;
    getDeals(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getDeal(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteDeal(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
