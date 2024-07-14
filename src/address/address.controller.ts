import { CustomLogger } from './../logger/custom-logger';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
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
} from '@nestjs/swagger';
import { AddressValidationPipe } from './address-validation.pipe';
import { HttpAddressExceptionFilter } from 'src/http-exception.filter';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { Role } from 'src/common/role.enum';
import { Roles } from 'src/common/role.decorator';
import { RoleGuard } from 'src/common/role.guard';

@ApiTags('address')
@Controller('address')
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpAddressExceptionFilter())
// @UseFilters(HttpAddressExceptionFilter) 这两种写法都可以，如果不是手动new 的话，NestJS 的DI 会帮你创建
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly customLogger: CustomLogger,
  ) {
    this.customLogger.log('AddressController initialized!');
  }

  @Get(':id')
  @Roles(Role.Reader, Role.Writer, Role.Admin)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Retrieve an address by its unique id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique id of the address',
  })
  //@UseFilters(HttpExceptionFilter)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const address = await this.addressService.getById(id);
    if (!address) {
      this.customLogger.debug(`Address not found for id:${id}`);
      throw new NotFoundException('Address not found');
    }
    this.customLogger.verbose(`Address is found for id: ${id}`);
    return address;
  }

  //   // address?id=1
  //   @Get()
  //   search(@Query() idParam: AddressIdParam) {
  //     console.log('type 1: ', typeof idParam.id);
  //     return this.addressService.getById(idParam.id);
  //   }

  @Get()
  @Roles(Role.Reader, Role.Writer, Role.Admin)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Retrieve all addresses' })
  async getAll() {
    return await this.addressService.getAll();
  }

  @Post()
  @Roles(Role.Writer, Role.Admin)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Create a new address' })
  @ApiBody({
    type: CreateAddressDto,
    description: 'The details of the new address',
  })
  @UsePipes(AddressValidationPipe)
  async create(@Body() address: CreateAddressDto) {
    return this.addressService.create(address); // here we can ignore await, nestjs will automatically chang it to await
  }

  @Put(':id')
  @Roles(Role.Writer, Role.Admin)
  @UseGuards(RoleGuard)
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() address: AddressDto,
  ) {
    return await this.addressService.update(id, address);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Delete an address by its unique id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique id of the address',
  })
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.addressService.delete(id);
  }
}
