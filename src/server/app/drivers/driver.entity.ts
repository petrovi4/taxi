import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToMany,
	JoinTable,
	ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/user.entity';
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
	@ManyToMany(() => Car)
	@JoinTable()
	cars: Car[];

	@Field((_type) => User)
	@ManyToOne((_type) => User, (user) => user.drivers, { nullable: false })
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
