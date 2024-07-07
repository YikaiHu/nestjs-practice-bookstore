import { OmitType } from '@nestjs/mapped-types';
import { AddressDto } from './address.dto';

export class CreateAddressDto extends OmitType(AddressDto, [
  'id',
  'createdDate',
]) {}
