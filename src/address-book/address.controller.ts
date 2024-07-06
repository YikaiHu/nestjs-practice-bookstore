import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AddressDto } from './address-dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  // Get a single route parameter
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    console.log('id parameter:', id);
    return {
      message: `received id: ${id}`,
    };
  }

  // Option 1: Use @Param as an object
  @Get('/country/:country/postcode/:postcode')
  search(@Param() params: { country: string; postcode: string }) {
    console.log('country', params.country);
    console.log('postcode', params.postcode);
    return {
      message: `received country: ${params.country}, postcode: ${params.postcode}`,
    };
  }

  //   Option 2: Multiple @Param
  // @Get('/country/:country/postcode/:postcode')
  // search2(@Param('country') country: string, @Param('postcode') postcode: string) {
  //     console.log("country", country);
  //     console.log("postcode", postcode);
  //     return {
  //     message: `received country: ${country}, postcode: ${postcode}`
  //  }
  // }

  // Query parameters#
  @Get()
  searchByPostCode(@Query('postcode') postcode: string) {
    console.log(postcode);
    return {
      message: `received postcode: ${postcode}`,
    };
  }

  // Access the request body using the @Body() decorator
  @Post()
  create(@Body() address: AddressDto) {
    console.log('AddressDto:', address);
    return {
      data: address,
    };
  }
}
