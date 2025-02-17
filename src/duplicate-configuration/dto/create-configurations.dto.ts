import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class ConfigurationFieldDto {
  @IsNumber()
  id: string;

  @IsString()
  configurationField: string;

  @IsNumber()
  weightValue: number;
}

export class CreateTenantSalesforceConfigurationsDto {
  @IsNumber()
  tenantId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConfigurationFieldDto)
  configurationFields?: ConfigurationFieldDto[];

  @IsNumber()
  threshold?: number;
}
