import { User } from '@/user/entities/user.entity';
import { CreateUserResponseDto } from '../dto/create-user.response.dto';
import { UserResponseDto } from '../dto/user.response.dto';
export declare const userNormalizer: {
    getCreateUserResponseDto(user: User): CreateUserResponseDto;
    getUserResponseDto(user: User): UserResponseDto;
};
