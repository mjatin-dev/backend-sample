import { IsUUID } from 'class-validator';

export class CreateDataMigrationDto {
  @IsUUID()
  dataSourceId: string;
}
