import { Inject, UseGuards } from '@nestjs/common';
import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from '../auth/graphql/gql-auth.decorator';
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard';
import { DriversService } from '../drivers/drivers.service';
import { User } from '../users/user.entity';
import { Car } from './car.entity';
import { CarService } from './cars.service';

@Resolver((_of) => Car)
export class CarResolver {
	constructor(
		@Inject(CarService) private carsService: CarService,
		@Inject(DriversService) private driversService: DriversService,
	) {}

	@Query((_returns) => [Car])
	@UseGuards(GqlAuthGuard)
	cars(@CurrentUser() user: User) {
		return this.carsService.findAll({ where: { user: user } });
	}

	@ResolveField()
	driver(@Parent() car: Car) {
		return this.driversService.findOne({
			where: { id: car.driver.id },
		});
	}

	@Mutation((_returns) => Car)
	@UseGuards(GqlAuthGuard)
	createCar(
		@CurrentUser() user: User,
		@Args({ name: 'driverName', type: () => String }) driverName: string,
		@Args({ name: 'alias', type: () => String }) alias: string,
	) {
		return this.carsService.createFromDriverDetails({
			alias: alias,
			user: user,
			driverName: driverName,
		});
	}
}
