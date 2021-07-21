import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Driver } from './driver.entity';
import { DriversResolver } from './drivers.resolver';
import { DriversService } from './drivers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [DriversService, DriversResolver],
  exports: [DriversService],
})
export class DriversModule {}
