import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ConfigurationService from './config/configuration.service';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configurationService = app.get(ConfigurationService);
  const microserviceOptions = configurationService.serviceOptions;

  const microservice = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  microservice.useGlobalPipes(new ValidationPipe());
  microservice.useGlobalFilters(new AllExceptionsFilter());

  await microservice
    .listen()
    .then(() => console.log(`RMQ mail server started`));
}
bootstrap();
