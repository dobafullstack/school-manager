import { Field, InputType } from "type-graphql";

@InputType()
export default class StudentInput{
    @Field({nullable: true})
    id?: number;

    @Field({nullable: true})
    name!: string;

    @Field({nullable: true})
    age!: number;

    @Field({nullable: true})
    phone?: string;

    @Field({nullable: true})
    classId!: number;
}