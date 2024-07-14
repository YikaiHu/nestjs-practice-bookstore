import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUsersDto, UserDto } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userDto: CreateUsersDto) {
    const existingUser = await this.userService.getByEmail(userDto.email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.FOUND);
    }
    return await this.userService.createUser(userDto);
  }

  async login(loginDto: LoginDto) {
    const existingUser = await this.userService.getByEmail(loginDto.username);
    const passwordMatch = await compare(loginDto.password, existingUser.password);
    if (!existingUser || !passwordMatch) {
      throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
    }
    const payload = { username: loginDto.username, sub: existingUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(user: UserDto) {
    const existingUser = await this.userService.getByEmail(user.email);
    const passwordMatch = await compare(
      user?.password,
      existingUser.password,
    );
    if (!existingUser || !passwordMatch) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
