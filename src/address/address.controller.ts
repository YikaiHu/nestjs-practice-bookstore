import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.addressService.getById(id);
    }

    @Get()
    getAll() {
        return this.addressService.getAll();
    }
}
