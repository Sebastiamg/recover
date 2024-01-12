import { DatabaseType } from 'typeorm';

export interface DbConfigInterface {
  // SYNCHRONIZE: true;
  DB_URL: string;
  DB_TYPE: DatabaseType;
}
