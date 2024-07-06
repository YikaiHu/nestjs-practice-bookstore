import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { AddressBookModule } from './address-book/address-book.module';

@Module({
  imports: [AddressModule, AddressBookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
