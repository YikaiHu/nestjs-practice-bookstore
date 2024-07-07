import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressStoreService} from './address-store.service';
import { AddressController } from './address.controller';

@Module({
  controllers: [AddressController],
  providers: [AddressService, AddressStoreService],
})
export class AddressModule {}
