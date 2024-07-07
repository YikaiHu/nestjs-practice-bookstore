import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export class BaseAddressException extends HttpException {
  public readonly errorHash: string; // 这里我们设置成public，这样才能在外部例如logger 的地方被使用
  public readonly timestamp: string;

  constructor(message: string, status: HttpStatus) {
    super(message, status);
    this.errorHash = uuid();
    this.timestamp = new Date().toISOString();
  }
}
