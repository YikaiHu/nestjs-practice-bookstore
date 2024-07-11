import { OmitType } from '@nestjs/mapped-types';
import { IsNumberString, IsNotEmpty, IsArray } from 'class-validator';

export class RoleDto {
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  name: string;
}

export class CreateRoleDto extends OmitType(RoleDto, ['id']) {}
