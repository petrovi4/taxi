import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Car } from '../cars/car.entity';

@ObjectType()
@Entity()
export class Driver {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ nullable: false })
	name: string;

	@Field((_type) => [Car], { nullable: 'items' })
	@OneToMany((_type) => Car, (car) => car.driver)
	cars?: Car[];

	@Field()
	@Column()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@Column()
	@UpdateDateColumn()
	updated_at: Date;
}
