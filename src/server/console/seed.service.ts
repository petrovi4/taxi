import { Inject } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';
import { DriversService } from '../app/drivers/drivers.service';

@Console()
export class SeedService {
	constructor(@Inject(DriversService) private driverService: DriversService) {}

	@Command({
		command: 'seed',
		description: 'Seed DB',
	})
	async seed(): Promise<void> {
		const spin = createSpinner();

		spin.start('Seeding the DB');

		await this.seedDrivers();

		spin.succeed('Seeding done');
	}

	async seedDrivers() {
		const drivers = [{ name: 'this is a driver you can assign to car' }];

		for (const driverParams of drivers) {
			const driver = await this.driverService.findOne({
				where: driverParams,
			});
			if (!driver) {
				await this.driverService.create(driverParams);
			}
		}
	}
}
