import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressStoreService } from './address-store.service';
import { AddressController } from './address.controller';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [AddressController],
  providers: [AddressService, AddressStoreService],
})
export class AddressModule {}
