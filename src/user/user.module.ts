import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AddressEntity, ContactEntity } from 'src/address/entities/address.entity';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([AddressEntity, UserEntity, ContactEntity, RoleEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
