import { IsObject, IsNotEmptyObject } from 'class-validator';

export class PostRecordDto {
  @IsObject()
  @IsNotEmptyObject()
  record: any;
}
