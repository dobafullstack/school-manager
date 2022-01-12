import { Field, InputType } from "type-graphql";

@InputType()
export default class RegisterInput {
    @Field({nullable: true})
    id?: number;

    @Field({ nullable: true })
    name!: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    username!: string;

    @Field({ nullable: true })
    password!: string;

    @Field({ nullable: true })
    role!: string;

    @Field({ nullable: true })
    schoolId?: number;
}
