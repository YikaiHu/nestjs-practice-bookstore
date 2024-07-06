import { Module } from '@nestjs/common';
import { AddressBookModule } from './address-book/address-book.module';

@Module({
  imports: [AddressBookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
