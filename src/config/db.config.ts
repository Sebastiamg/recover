import { ConfigService, registerAs } from '@nestjs/config';
import { DbConfigInterface } from './interfaces/db-config.interface';

export const DataBaseSourceConfig = registerAs(
  'DataBaseSourceConfig',
  (): DbConfigInterface => {
    const dbConfig = new ConfigService<DbConfigInterface>();

    return {
      DB_URL: dbConfig.get('DB_URL'),
      DB_TYPE: dbConfig.get('DB_TYPE'),
    };
  },
);
