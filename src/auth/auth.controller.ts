import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto, UserDto } from 'src/user/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/common/local-auth.guard';
import { LoginDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  public async signup(@Body() user: CreateUsersDto, @Res() res) {
    const newUser = await this.authService.signup(user);
    return res.json(newUser);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
