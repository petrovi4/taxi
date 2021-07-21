import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConnectionOptions } from 'typeorm';

import { SeedService } from 'src/server/console/seed.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ConsoleModule,
    AuthModule,
    UsersModule,
    DriversModule,
    CarsModule,
  ],
  providers: [SeedService, AppService],
  controllers: [AppController],
})
export class AppModule {}
