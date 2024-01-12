import { ConfigService, registerAs } from '@nestjs/config';
import { AppConfigInterface } from './interfaces/app-config.interface';

export const AppConfig = registerAs(
  'AppConfigSource',
  (): AppConfigInterface => {
    const config = new ConfigService<AppConfigInterface>();

    return {
      PORT: config.get('PORT'),
      PREFIX: config.get('PREFIX'),
    };
  },
);
