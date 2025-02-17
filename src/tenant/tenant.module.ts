import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantService } from './services/tenant.service';
import { TenantController } from './tenant.controller';
import { UserModule } from '@/user/user.module';
import { TenantRepository } from './repositories/tenant.repository';
import { AuthModule } from '@/auth/auth.module';
import { TenantContactInformationRepository } from './repositories/tenantContactInformation.repository';
import { TenantAccountRepository } from './repositories/tenantAccount.repository';
import { TenantContactInformationService } from './services/tenantContactInformation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TenantRepository,
      TenantContactInformationRepository,
      TenantAccountRepository,
    ]),
    UserModule,
    forwardRef(() => AuthModule),
  ],
  providers: [TenantService, TenantContactInformationService],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
