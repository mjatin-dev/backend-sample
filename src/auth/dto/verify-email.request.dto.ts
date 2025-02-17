import { IsEmail, IsString } from 'class-validator';

export class VerifyRequestDto {
  @IsString()
  token: string;
}
