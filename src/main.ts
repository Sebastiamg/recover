import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  const appConfig = AppConfig();

  app.setGlobalPrefix(appConfig.PREFIX);

  await app.listen(appConfig.PORT);

  console.log(
    `App is running on -> ${(await app.getUrl()).concat(appConfig.PREFIX)}`,
  );
}
bootstrap();
