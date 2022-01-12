import { Field, InputType } from "type-graphql";

@InputType()
export default class ClassInput{
    @Field({nullable: true})
    id?: number;

    @Field({nullable: true})
    name!: string;

    @Field({nullable: true})
    grade!: number;

    @Field({nullable: true})
    schoolId!: number;

    @Field({nullable: true})
    teacherId!: number;
}