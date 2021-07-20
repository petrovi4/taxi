import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Driver } from '../drivers/driver.entity';

@ObjectType()
@Entity()
export class Car {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ nullable: false })
	alias: string;

	@Field((_type) => User)
	@ManyToOne((_type) => User, (user) => user.cars, { nullable: false })
	user: User;

	@Field((_type) => Driver)
	@ManyToOne((_type) => Driver, (driver) => driver.cars, { nullable: false })
	driver: Driver;

	@Field()
	@Column()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@Column()
	@UpdateDateColumn()
	updated_at: Date;
}
