import { IsNumberString, IsNotEmpty, IsArray, IsOptional } from "class-validator";
import { ContactDto } from "./contact.dto";
import { OmitType } from "@nestjs/mapped-types";

export class UserDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;
    
    @IsNumberString()
    @IsOptional()
    addressId: number;

    @IsArray()
    @IsOptional()
    contacts: ContactDto[];
}

export class CreateUsersDto extends OmitType(UserDto, ['id' ]) { }