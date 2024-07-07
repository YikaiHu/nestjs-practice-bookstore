import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { AddressBookModule } from './address-book/address-book.module';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [AddressModule, AddressBookModule, LoggerModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
