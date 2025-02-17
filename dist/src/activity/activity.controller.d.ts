import { ActivityService } from './activity.service';
import { CreateActivityRequestDto } from './dto/create-activity.request.dto';
import { UpdateActivityRequestDto } from './dto/update-activity.request.dto';
import { SuccessResponseObject } from '../common/http';
import { IAuthedUser } from '@/auth/types';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    createActivity(authedUser: IAuthedUser, body: CreateActivityRequestDto): Promise<SuccessResponseObject>;
    updateActivity(authedUser: IAuthedUser, id: number, body: UpdateActivityRequestDto): Promise<SuccessResponseObject>;
    getActivitys(authedUser: IAuthedUser, query: {
        contactId: number;
    }): Promise<SuccessResponseObject>;
    getActivity(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteActivity(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
