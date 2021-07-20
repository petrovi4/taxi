import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarService } from './cars.service';
import { CarResolver } from './cars.resolver';
import { Car } from './car.entity';
import { DriversModule } from '../drivers/drivers.module';

@Module({
	imports: [TypeOrmModule.forFeature([Car]), DriversModule],
	providers: [CarService, CarResolver],
})
export class CarsModule {}
