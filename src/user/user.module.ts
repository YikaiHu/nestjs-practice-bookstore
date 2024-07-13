import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AddressEntity, ContactEntity } from 'src/address/entities/address.entity';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { StateController } from './state.controller';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([AddressEntity, UserEntity, ContactEntity, RoleEntity]),
    CacheModule.register({
      ttl: 100000,
      max: 200,
    }),
  ],
  controllers: [UserController, StateController],
  providers: [UserService],
})
export class UserModule {}
