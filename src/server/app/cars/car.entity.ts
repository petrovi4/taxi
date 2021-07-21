import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
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
	number: string;

	@Field((_type) => [Driver], { nullable: 'items' })
	@ManyToMany(() => Driver)
	@JoinTable()
	drivers: Driver[];

	@Field((_type) => User)
	@ManyToOne((_type) => User, (user) => user.cars, { nullable: false })
	creator: User;

	@Field()
	@Column()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@Column()
	@UpdateDateColumn()
	updated_at: Date;
}
