import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { convertCamel } from './conver-camel';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const reqObj = context.switchToHttp().getRequest();
    if (reqObj && reqObj.body) {
      console.log(reqObj.body, '=>', convertCamel(reqObj.body));
      reqObj.body = convertCamel(reqObj.body);

      return next.handle().pipe(
        map((res: unknown) => {
          const resObj = context.switchToHttp().getResponse();
          return {
            data: res,
            status: resObj.statusCode,
            success: true,
            error: null,
          };
        }),
      );
    }
  }
}
