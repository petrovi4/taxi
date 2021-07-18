import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

@Module({
	imports: [TypeOrmModule.forFeature([Driver])],
	providers: [DriversService],
	controllers: [DriversController],
})
export class DriversModule {}
