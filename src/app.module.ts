import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { AddressBookModule } from './address-book/address-book.module';

@Module({
  imports: [AddressModule, AddressBookModule],
})
export class AppModule {}
