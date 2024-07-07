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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an address by its unique id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique id of the address',
  })
  @ApiResponse({
    status: 200,
    description: 'The address has been successfully retrieved.',
    type: AddressDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all addresses' })
  @ApiResponse({
    status: 200,
    description: 'All addresses have been successfully retrieved.',
    type: [AddressDto],
  })
  getAll() {
    return this.addressService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  @ApiBody({
    type: CreateAddressDto,
    description: 'The details of the new address',
  })
  @ApiResponse({
    status: 201,
    description: 'The address has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() address: CreateAddressDto) {
    return this.addressService.create(address);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing address' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique id of the address',
  })
  @ApiBody({
    type: AddressDto,
    description: 'The updated details of the address',
  })
  @ApiResponse({
    status: 200,
    description: 'The address has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() address: AddressDto) {
    return this.addressService.update(id, address);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an address by its unique id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique id of the address',
  })
  @ApiResponse({
    status: 200,
    description: 'The address has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Address not found.' })
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.delete(id);
  }
}
