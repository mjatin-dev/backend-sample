import { Strategy } from 'passport-jwt';
import { UserService } from '@/user/services/user.service';
import { IAuthedUser } from './types';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    protected readonly userService: UserService;
    constructor(userService: UserService);
    validate(payload: any): Promise<IAuthedUser>;
}
export {};
