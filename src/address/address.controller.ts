import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.getById(id);
  }

  @Get()
  getAll() {
    return this.addressService.getAll();
  }

  @Post()
  create(@Body() address: CreateAddressDto) {
    return this.addressService.create(address);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() address: AddressDto) {
    return this.addressService.update(id, address);
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.delete(id);
  }
}