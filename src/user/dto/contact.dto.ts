import { OmitType } from "@nestjs/mapped-types";
import { IsNumberString, IsNotEmpty } from "class-validator";

export class ContactDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    type: string;
    
    @IsNotEmpty()
    value: string;
}

export class CreateContactDto extends OmitType(ContactDto, ['id' ]) { }