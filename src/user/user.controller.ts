import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUsersDto } from './dto/user.dto';
import { CreateContactDto } from './dto/contact.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getByUserId(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getByUserId(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Post()
  async create(@Body() user: CreateUsersDto) {
    return await this.userService.createUser(user);
  }

  @Post('contact')
  async createContact(@Body() contact: CreateContactDto) {
    return await this.userService.createUserContact(contact);
  }
}
