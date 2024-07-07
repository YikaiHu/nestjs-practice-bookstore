import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import {
  AddressDto,
  AddressIdParam,
  CreateAddressDto,
} from './dto/address.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
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
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.getById(id);
  }

  //   // address?id=1
  //   @Get()
  //   search(@Query() idParam: AddressIdParam) {
  //     console.log('type 1: ', typeof idParam.id);
  //     return this.addressService.getById(idParam.id);
  //   }

  @Get()
  @ApiOperation({ summary: 'Retrieve all addresses' })
  getAll() {
    return this.addressService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  @ApiBody({
    type: CreateAddressDto,
    description: 'The details of the new address',
  })
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
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.delete(id);
  }
}
