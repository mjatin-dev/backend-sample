import { CreateActivityRequestDto } from './dto/create-activity.request.dto';
import { ActivityResponseDto } from './dto/activity.response.dto';
import { UpdateActivityRequestDto } from './dto/update-activity.request.dto';
import { ActivityRepository } from './repositories/activity.repository';
import { EmailActivityDetailRepository } from './repositories/emailActivityDetail.repository';
import { GmailService } from '@/core/lib/google/gmail.service';
export declare class ActivityService {
    private readonly activityRepository;
    private readonly emailDetailRepository;
    private readonly gmailService;
    constructor(activityRepository: ActivityRepository, emailDetailRepository: EmailActivityDetailRepository, gmailService: GmailService);
    create(data: CreateActivityRequestDto, userId: number): Promise<ActivityResponseDto>;
    findOne(id: number, userId: number): Promise<ActivityResponseDto>;
    update(id: number, data: UpdateActivityRequestDto, ownerId: number): Promise<ActivityResponseDto>;
    syncGmail(userId: number): Promise<void>;
    findAll(userId: number, contactId?: number): Promise<ActivityResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
