import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUsersDto } from './dto/user.dto';
import { CreateContactDto } from './dto/contact.dto';
import { RoleConstant } from './role.constant';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  strategy: 'excludeAll',
})
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

  @Get('admin/:id')
  @SerializeOptions({
    groups: [RoleConstant.Admin],
  })
  async getByAdmin(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getByUserId(id);
  }

  @Get('editor/:id')
  @SerializeOptions({
    groups: [RoleConstant.Editor],
  })
  async getByEditor(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getByUserId(id);
  }

  @Get('reader/:id')
  @SerializeOptions({
    groups: [RoleConstant.Reader],
  })
  async getByReader(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getByUserId(id);
  }
}
