import { IsNumberString, IsNotEmpty, IsArray, IsOptional, IsString, IsEmail } from "class-validator";
import { ContactDto } from "./contact.dto";
import { OmitType } from "@nestjs/mapped-types";
import { RoleDto } from "./role.dto";

export class UserDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
    
    @IsNumberString()
    @IsOptional()
    addressId: number;

    @IsArray()
    @IsOptional()
    contacts: ContactDto[];

    @IsArray()
    @IsOptional()
    roles: RoleDto[];
}

export class CreateUsersDto extends OmitType(UserDto, ['id' ]) { }