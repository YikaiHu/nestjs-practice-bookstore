import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressStoreService } from './address-store.service';
import { AddressController } from './address.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([AddressEntity])],
  controllers: [AddressController],
  providers: [AddressService, AddressStoreService],
})
export class AddressModule {}
