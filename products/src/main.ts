import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/filters/all-exception.filter';
import { validationExceptionFactory } from './utils/exception-factories/validation.exception-factory';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
      host: configService.get<string>('host'),
      port: configService.get<number>('port'),
    },
  };

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      microserviceOptions,
    );

  microservice.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );
  microservice.useGlobalFilters(new AllExceptionsFilter());
  microservice.useLogger(microservice.get(Logger));

  await microservice
    .listen()
    .then(() =>
      console.log(
        `Server started on port ${configService.get<number>('port')}`,
      ),
    );
}

bootstrap();
