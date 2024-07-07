import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @IsNumber()
  id: number;
  @IsNotEmpty()
  addressLine: string;
  @IsNumber()
  postCode: number;
  @IsString()
  state: string;
  @IsDate()
  createdDate: Date;
}

export class CreateAddressDto extends OmitType(AddressDto, [
  'id',
  'createdDate',
]) {}

export class AddressIdParam {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  id: number;
}
