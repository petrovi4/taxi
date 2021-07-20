import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { CarsModule } from './cars.module';
import { CarResolver } from './cars.resolver';
import { CarService } from './cars.service';
import { usersFactory, driversFactory, carsFactory } from 'test/factories';
import { DriversModule } from '../drivers/drivers.module';
import { DriversService } from '../drivers/drivers.service';

describe('CarResolver', () => {
	let resolver: CarResolver;
	let carsFactory: CarService;
	let usersService: UsersService;
	let driversFactory: DriversService;
	let moduleRef: TestingModule;

	beforeEach(async () => {
		moduleRef = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					url: process.env.DATABASE_URL,
				}),
				CarsModule,
				UsersModule,
				DriversModule,
			],
		}).compile();

		resolver = moduleRef.get<CarResolver>(CarResolver);
		carsFactory = moduleRef.get<CarService>(CarService);
		usersService = moduleRef.get<UsersService>(UsersService);
		driversFactory = moduleRef.get<DriversService>(DriversService);

		await getConnection().synchronize(true);
	});

	afterEach(async () => {
		await moduleRef.close();
	});

	describe('cars', () => {
		it('returns cars of user', async () => {
			const user = await usersService.create(usersFactory.build());
			const driver = await driversFactory.create(driversFactory.build());
			const car = await carsFactory.create(
				carsFactory.build({}, { associations: { user: user, driver: driver } }),
			);

			const result = await resolver.cars(user);

			expect([car]).toMatchObject(result);
		});

		it('does not return cars of another user', async () => {
			const anotherUser = await usersService.create(usersFactory.build());
			const driver = await driversFactory.create(driversFactory.build());
			await carsFactory.create(
				carsFactory.build(
					{},
					{ associations: { user: anotherUser, driver: driver } },
				),
			);

			const user = await usersService.create(usersFactory.build());
			const result = await resolver.cars(user);

			expect(result).toEqual([]);
		});
	});

	describe('createCar', () => {
		it('returns the car', async () => {
			const user = await usersService.create(usersFactory.build());
			const driver = await driversFactory.create(driversFactory.build());
			const alias = carsFactory.build().alias;

			const result = await resolver.createCar(user, driver.name, alias);

			expect(result).toMatchObject({ alias: alias });
		});

		it('creates an car', async () => {
			const user = await usersService.create(usersFactory.build());
			const driver = await driversFactory.create(driversFactory.build());
			const alias = carsFactory.build().alias;

			await resolver.createCar(user, driver.name, alias);

			const carCount = (
				await carsFactory.findAll({ where: { user: user } })
			).length;
			expect(carCount).toEqual(1);
		});

		it('does not create the same car twice', async () => {
			const user = await usersService.create(usersFactory.build());
			const driver = await driversFactory.create(driversFactory.build());
			const alias = carsFactory.build().alias;

			await resolver.createCar(user, driver.name, alias);
			await resolver.createCar(user, driver.name, alias);

			const carCount = (
				await carsFactory.findAll({ where: { user: user } })
			).length;
			expect(carCount).toEqual(1);
		});
	});
});
