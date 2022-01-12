import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import Class from './Class';
import School from './School';

@Entity()
@ObjectType()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field((_return) => ID)
    id!: number;

    @Column({ nullable: true })
    schoolId?: number;

    @Field((_types) => School, { nullable: true })
    @ManyToOne(() => School, (school) => school.teachers)
    school: School;

    @OneToOne((_type) => Class)
    @JoinColumn()
    @Field((_return) => Class, { nullable: true })
    class: Class;

    @Column()
    @Field()
    username!: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    email?: string;

    @Column()
    @Field()
    name!: string;

    @Column()
    @Field()
    password!: string;

    @Column()
    @Field()
    role!: string;

    @CreateDateColumn({ nullable: true })
    @Field({ nullable: true })
    createdAt?: Date;

    @UpdateDateColumn({ nullable: true })
    @Field({ nullable: true })
    updatedAt?: Date;
}
