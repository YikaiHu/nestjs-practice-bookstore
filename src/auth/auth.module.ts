import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from 'src/common/local.strategy';
import { JwtStrategy } from 'src/common/jwt.strategy';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

const configService = new ConfigService();
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    JwtModule.register({
      secret: configService.get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
