import { AccountResponseDto } from '../dto/account/account.response.dto';
import { Account } from '../entities/account.entity';
export declare const accountNormalizer: {
    getAccountResponseDto(account: Account): AccountResponseDto;
};
