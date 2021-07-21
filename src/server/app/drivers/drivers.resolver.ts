import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { Driver } from './driver.entity';
import { DriversService } from './drivers.service';

@Resolver((_of) => Driver)
export class DriversResolver {
  constructor(@Inject(DriversService) private driversService: DriversService) {}

  @Query((_returns) => [Driver])
  async drivers(params: FindManyOptions<Driver> = {}): Promise<Driver[]> {
    return this.driversService.findAll(params);
  }
}
