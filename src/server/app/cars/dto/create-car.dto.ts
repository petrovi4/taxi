import { Driver } from '../../drivers/driver.entity';
import { User } from '../../users/user.entity';

export class CreateCarDto {
	number: string;
	creator: User;
}

export class CreateCarFromDriverDetailsDto {
	number: string;
	creator: User;
	driverName: string;
}
