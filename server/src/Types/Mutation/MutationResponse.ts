import { ClassType, Field, InterfaceType, ObjectType } from 'type-graphql';
import FieldError from '../FieldError';

export default function MutationResponse<T>(Result: ClassType<T>){
    @ObjectType({ isAbstract: true })
    abstract class MutationResponseClass {
        @Field()
        code!: number;

        @Field()
        success!: boolean;

        @Field()
        message!: string;

        @Field(_type => Result, {nullable: true})
        result?: T;

        @Field((_return) => [FieldError], { nullable: true })
        errors?: FieldError[];
    }

    return MutationResponseClass
}
