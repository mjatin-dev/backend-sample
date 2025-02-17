import { UserService } from './services/user.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { SuccessResponseObject } from '../common/http';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { IAuthedUser } from '@/auth/types';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(authedUser: IAuthedUser, body: CreateUserRequestDto): Promise<SuccessResponseObject>;
    getUsers(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getUser(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    getCurrentUser(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    updateUser(authedUser: IAuthedUser, id: number, body: UpdateUserRequestDto): Promise<SuccessResponseObject>;
    deleteUser(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    inactivateUser(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    reactivateUser(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
