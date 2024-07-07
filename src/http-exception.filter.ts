import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BaseAddressException } from './base-address-exception';

@Catch(BaseAddressException)
export class HttpAddressExceptionFilter implements ExceptionFilter {
  catch(exception: BaseAddressException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: exception.timestamp,
      errorHash: exception.errorHash,
    });
  }
}
