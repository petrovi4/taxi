import { Driver } from '../../drivers/driver.entity';
import { User } from '../../users/user.entity';

export class CreateCarDto {
	alias: string;
	user: User;
	driver: Driver;
}

export class CreateCarFromDriverDetailsDto {
	alias: string;
	user: User;
	driverName: string;
}
