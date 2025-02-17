import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicrosoftOfficeController } from './office.controller';
import { OfficeService } from './office.service';
import DBService from './services/DBService';
import { MyAuthenticationProvider } from './services/MSCustomAuthProvider';
import { MicrosoftGraphApiService } from './services/MicrosoftGraphApi.service';
import { KmsManagerService } from './services/kmsService';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [MicrosoftOfficeController],
  providers: [
    OfficeService,
    MicrosoftGraphApiService,
    DBService,
    KmsManagerService,
  ],
  exports: [OfficeService],
})
export class OfficeModule {}
