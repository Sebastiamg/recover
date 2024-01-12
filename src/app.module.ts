import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseSourceConfig } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
      expandVariables: true,
      load: [DataBaseSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (dbConfig: ConfigType<typeof DataBaseSourceConfig>) => {
        return {
          type: dbConfig.DB_TYPE,
          url: dbConfig.DB_URL,

          // For development
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [DataBaseSourceConfig.KEY],
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
