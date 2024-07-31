import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ConfigurationService from './config/configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configurationService = app.get(ConfigurationService);
  const microserviceOptions = configurationService.serviceOptions;

  const microservice = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  await microservice.listen().then(() => console.log(`RMQ server started`));
}
bootstrap();
