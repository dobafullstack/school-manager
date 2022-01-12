import { Field, InputType } from "type-graphql";

@InputType()
export default class SchoolInput{
    @Field({nullable: true})
    id?: number

    @Field({nullable: true})
    name?: string;

    @Field({nullable: true})
    city?: string;

    @Field({nullable: true})
    district?: string;
}