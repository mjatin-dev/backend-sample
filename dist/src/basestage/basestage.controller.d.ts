import { baseStageService } from './basestage.service';
import { SuccessResponseObject } from '../common/http';
import { IAuthedUser } from '@/auth/types';
export declare class pipelineController {
    private readonly baseStageService;
    constructor(baseStageService: baseStageService);
    getpipelines(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
}
