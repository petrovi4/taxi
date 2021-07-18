import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './driver.entity';

@Injectable()
export class DriversService {
	constructor(
		@InjectRepository(Driver)
		private readonly driversRepository: Repository<Driver>,
	) {}

	create(createDriverDto: CreateDriverDto): Promise<Driver> {
		const driver = new Driver();
		driver.firstName = createDriverDto.firstName;
		driver.lastName = createDriverDto.lastName;

		return this.driversRepository.save(driver);
	}

	async findAll(): Promise<Driver[]> {
		return this.driversRepository.find();
	}

	findOne(id: string): Promise<Driver> {
		return this.driversRepository.findOne(id);
	}

	async remove(id: string): Promise<void> {
		await this.driversRepository.delete(id);
	}
}
