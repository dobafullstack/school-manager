import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Class from './Class';
import User from './User';

@Entity()
@ObjectType()
export default class School extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field((_return) => ID)
    id!: number;

    @Column()
    @Field()
    city!: string;

    @Column()
    @Field()
    district!: string;

    @Column()
    @Field()
    name!: string;

    @Field(_return => [User])
    @OneToMany(() => User, user => user.school)
    teachers: User[]

    @Field(_return => [Class])
    @OneToMany(_type => Class, c => c.school)
    classes: Class[];

    @CreateDateColumn()
    @Field()
    createdAt!: string;

    @UpdateDateColumn()
    @Field()
    updatedAt!: string;
}
