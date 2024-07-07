import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateAddressException extends HttpException {
  constructor(addressLine: string) {
    super(`The address '${addressLine}' already exists.`, HttpStatus.CONFLICT);
  }
}
