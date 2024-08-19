import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './utils/filters/rcp-exception-filter';
import { Logger } from 'nestjs-pino';
import { LoggingInterceptor } from './utils/interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get('port');

  const options = new DocumentBuilder()
    .setTitle('API docs')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(PORT, () => {
    console.log(`Gateway started on port ${PORT}`);
  });
}
bootstrap();
