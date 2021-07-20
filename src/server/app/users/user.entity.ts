import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Provider } from 'src/server/common/types/user';
import { Car } from '../cars/car.entity';

@ObjectType()
@Entity()
export class User {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ nullable: false })
	provider: Provider;

	@Field()
	@Column({ nullable: false })
	providerId: string;

	@Field()
	@Column({ nullable: false })
	username: string;

	@Field()
	@Column({ nullable: true })
	name?: string;

	@Field()
	@Column({ nullable: true })
	email?: string;

	@Field((_type) => [Car], { nullable: 'items' })
	@OneToMany((_type) => Car, (car) => car.user)
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
