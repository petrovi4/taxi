import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './driver.entity';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
	constructor(private readonly driversService: DriversService) {}

	@Post()
	create(@Body() createDriverDto: CreateDriverDto): Promise<Driver> {
		return this.driversService.create(createDriverDto);
	}

	@Get()
	findAll(): Promise<Driver[]> {
		return this.driversService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Driver> {
		return this.driversService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.driversService.remove(id);
	}
}
