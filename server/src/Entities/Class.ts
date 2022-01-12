import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import School from './School';
import Student from './Student';
import User from './User';

@Entity()
@ObjectType()
export default class Class extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field((_return) => ID)
    id!: number;

    @Column()
    @Field()
    name!: string;

    @Column()
    @Field()
    grade!: number;

    @Column()
    @Field()
    teacherId!: number;

    @OneToOne((_type) => User, (user) => user.class)
    @Field((_return) => User, { nullable: true })
    teacher!: User;

    @Column()
    @Field()
    schoolId!: number;

    @ManyToOne((_type) => School, (school) => school.classes)
    @Field((_return) => School, { nullable: true })
    school!: School;

    @OneToMany((_type) => Student, (student) => student.class)
    @Field((_return) => [Student])
    students: Student[];

    @CreateDateColumn()
    @Field()
    createdAt!: Date;

    @UpdateDateColumn()
    @Field()
    updatedAt!: Date;
}
