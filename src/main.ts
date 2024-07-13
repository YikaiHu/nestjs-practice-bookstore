import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/response.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn']
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      disableErrorMessages: false,
      validationError: {
        value: false,
      },
      transform: true, // must enable this, or the id in query mode will be string
    }),
  );
  app.enableCors();

  // Create Swagger options
  const options = new DocumentBuilder()
    .setTitle('Address Book API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  // Generate the Swagger document
  const document = SwaggerModule.createDocument(app, options);

  // Configure Swagger UI
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
