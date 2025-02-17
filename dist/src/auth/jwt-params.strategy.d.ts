import { Strategy } from 'passport-jwt';
import { JwtStrategy } from './jwt.strategy';
import { IAuthedUser } from './types';
declare const JwtParamsStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtParamsStrategy extends JwtParamsStrategy_base {
    private readonly jwtStrategy;
    constructor(jwtStrategy: JwtStrategy);
    validate(payload: any): Promise<IAuthedUser>;
}
export {};
