import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, FindOneOptions } from 'typeorm';

import { Driver } from './driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriversService {
	constructor(
		@InjectRepository(Driver)
		private driversRepository: Repository<Driver>,
	) {}

	create(driver: CreateDriverDto) {
		return this.driversRepository.save(driver);
	}

	findOne(params: FindOneOptions<Driver> = {}) {
		return this.driversRepository.findOne(params);
	}

	findAll(params: FindManyOptions<Driver> = {}) {
		return this.driversRepository.find(params);
	}
}
