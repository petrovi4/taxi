import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversModule } from './drivers/drivers.module';
import { getConnectionOptions } from 'typeorm';


@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async () =>
				Object.assign(await getConnectionOptions(), {
					autoLoadEntities: true,
				}),
		}),
		DriversModule,
	],
	controllers: [AppController],
	providers: [AppService],
})

export class AppModule {}
