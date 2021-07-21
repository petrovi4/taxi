import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { DriversService } from '../drivers/drivers.service';
import {
	CreateCarDto,
	CreateCarFromDriverDetailsDto,
} from './dto/create-car.dto';
import { Car } from './car.entity';

@Injectable()
export class CarService {
	constructor(
		@InjectRepository(Car)
		private carsRepository: Repository<Car>,
		@Inject(DriversService) private driversService: DriversService,
	) {}

	create(car: CreateCarDto) {
		return this.carsRepository.save(car);
	}

	findOne(params: FindOneOptions<Car> = {}) {
		return this.carsRepository.findOne(
			Object.assign({ relations: ['creator', 'drivers'] }, params),
		);
	}

	findAll(params: FindManyOptions<Car> = {}) {
		return this.carsRepository.find(
			Object.assign({ relations: ['creator', 'drivers'] }, params),
		);
	}

	async findOrCreateOne(params: FindOneOptions<Car> = {}) {
		let car: Car;

		car = await this.findOne(params);
		if (!car) {
			const conditions = params.where as CreateCarDto;
			car = await this.create({
				number: conditions.number,
				creator: conditions.creator,
			});
		}

		return car;
	}

	async createFromDriverDetails(params: CreateCarFromDriverDetailsDto) {
		const driver = await this.driversService.findOne({
			where: { name: params.driverName },
		});

		return this.findOrCreateOne({
			where: { creator: params.creator, number: params.number, driver: driver },
		});
	}
}
