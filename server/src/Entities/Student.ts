import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Class from './Class';

@Entity()
@ObjectType()
export default class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field((_return) => ID)
    id!: number;

    @Column()
    @Field()
    name!: string;

    @Column()
    @Field()
    age!: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    phone?: string;

    @Column()
    @Field()
    classId!: number;

    @ManyToOne((_type) => Class, (c) => c.students)
    @Field((_return) => Class, { nullable: true })
    class: Class;

    @CreateDateColumn()
    @Field()
    createdAt!: Date;

    @UpdateDateColumn()
    @Field()
    updatedAt!: Date;
}
