import _ from 'lodash';
import {
    Arg,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware
} from 'type-graphql';
import Class from '../Entities/Class';
import School from '../Entities/School';
import User from '../Entities/User';
import { Authentication, Strict } from '../Middlewares/Auth.middleware';
import { Context } from '../Types/Context';
import RegisterInput from '../Types/InputType/RegisterInput';
import { UserMutationResponse } from './AuthResolver';

@Resolver((_return) => User)
export default class UserResolver {
    //School Field
    @FieldResolver((_return) => School, { nullable: true })
    async school(@Root() root: User): Promise<School | null> {
        const school = await School.findOne(root.schoolId);

        if (!school) return null;

        return school;
    }

    //Class Field
    @FieldResolver((_return) => Class, { nullable: true })
    async class(@Root() root: User): Promise<Class | null> {
        const c = await Class.findOne({ teacherId: root.id });

        if (!c) return null;

        return c;
    }

    //Get All User
    @UseMiddleware(Authentication)
    @UseMiddleware(Strict)
    @Query((_return) => [User])
    async GetAllUsers(): Promise<User[]> {
        const users = await User.find();

        return users;
    }

    //Update user
    @UseMiddleware(Authentication)
    @UseMiddleware(Strict)
    @Mutation((_return) => UserMutationResponse)
    async UpdateUser(
        @Arg('updateUserInput') updateUserInput: RegisterInput
    ): Promise<UserMutationResponse> {
        const existingUser = await User.findOne(updateUserInput.id);

        if (!existingUser) {
            return {
                code: 400,
                success: false,
                message: 'Can not find any user',
                errors: [{ field: 'id', message: 'Invalid id' }],
            };
        }

        _.extend(existingUser, updateUserInput);
        await existingUser.save();

        return {
            code: 200,
            success: true,
            message: 'Update User Successfully',
            result: existingUser,
        };
    }

    //Delete User
    @UseMiddleware(Authentication)
    @UseMiddleware(Strict)
    @Mutation((_return) => UserMutationResponse)
    async DeleteUser(@Arg('userId') userId: number): Promise<UserMutationResponse> {
        const existingUser = await User.findOne(userId);

        if (!existingUser) {
            return {
                code: 400,
                success: false,
                message: 'Can not find any user',
                errors: [{ field: 'id', message: 'Invalid id' }],
            };
        }

        await User.remove(existingUser);

        return {
            code: 200,
            success: true,
            message: 'Delete User Successfully',
            result: existingUser,
        };
    }

    //Get My User
    @UseMiddleware(Authentication)
    @Query((_return) => User, { nullable: true })
    async GetMyUser(@Ctx() { req }: Context): Promise<User | null> {
        const user = await User.findOne(req.session.userId);

        if (!user) return null;

        return user;
    }

    //Update my user
    @UseMiddleware(Authentication)
    @Mutation((_return) => UserMutationResponse)
    async UpdateMyUser(
        @Ctx() { req }: Context,
        @Arg('updateUserInput') updateUserInput: RegisterInput
    ): Promise<UserMutationResponse> {
        const existingUser = await User.findOne(req.session.userId);

        if (!existingUser) {
            return {
                code: 400,
                success: false,
                message: 'Can not find any user',
                errors: [{ field: 'id', message: 'Invalid id' }],
            };
        }

        _.extend(existingUser, updateUserInput);
        await existingUser.save();

        return {
            code: 200,
            success: true,
            message: 'Update User Successfully',
            result: existingUser,
        };
    }
}
