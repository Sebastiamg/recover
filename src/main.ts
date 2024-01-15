import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  const appConfig = AppConfig();

  const logger = new Logger(bootstrap.name);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.setGlobalPrefix(appConfig.PREFIX);

  await app.listen(appConfig.PORT);

  logger.debug(
    `App is running on -> ${(await app.getUrl()).concat(appConfig.PREFIX)}`,
  );
}
bootstrap();
