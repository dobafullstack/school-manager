import { COOKIES_NAME } from '../Constants/index';
import md5 from 'md5';
import { Arg, Ctx, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Context } from '../Types/Context';
import LoginInput from '../Types/InputType/LoginInput';
import Logger from '../Configs/Logger';
import User from '../Entities/User';
import RegisterInput from '../Types/InputType/RegisterInput';
import { ValidateRegister } from '../Utils/Validation';
import MutationResponse from '../Types/Mutation/MutationResponse';
import _ from 'lodash';
import { Authentication, Strict } from '../Middlewares/Auth.middleware';

@ObjectType()
export class UserMutationResponse extends MutationResponse(User) {}
@Resolver()
export default class AuthResolver {
    //Register
    @Mutation((_return) => UserMutationResponse)
    async Register(
        @Arg('registerInput') registerInput: RegisterInput
    ): Promise<UserMutationResponse> {
        const { username, email, password } = registerInput;
        const validate = ValidateRegister(registerInput);

        if (validate !== null) {
            return {
                ...validate,
            };
        }

        try {
            const existingUser = await User.findOne({
                where: [{ username }, { email }],
            });

            if (existingUser) {
                return {
                    code: 400,
                    message: 'Duplicate username or email',
                    success: false,
                    errors: [
                        {
                            field: existingUser.username === username ? 'username' : 'email',
                            message: `${
                                existingUser.username === username ? 'Username' : 'Email'
                            } already taken`,
                        },
                    ],
                };
            }

            const hashPassword = md5(password);

            const newUser = User.create({
                ...registerInput,
                password: hashPassword,
            });

            return {
                code: 201,
                success: true,
                message: 'Register successfully',
                result: await User.save(newUser),
            };
        } catch (error: any) {
            Logger.error(error.message);

            return {
                code: 500,
                success: false,
                message: `Interval server error ${error.message}`,
            };
        }
    }

    //Login
    @Mutation((_return) => UserMutationResponse)
    async Login(
        @Arg('loginInput') loginInput: LoginInput,
        @Ctx() { req }: Context
    ): Promise<UserMutationResponse> {
        const { usernameOrEmail, password } = loginInput;
        const existingUser = await User.findOne(
            usernameOrEmail.includes('@')
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail }
        );
        const hashedPassword = md5(password);

        if (!existingUser || existingUser.password !== hashedPassword) {
            return {
                code: 400,
                success: false,
                message: 'Invalid username or password',
                errors: [
                    { field: 'usernameOrEmail', message: 'Invalid' },
                    { field: 'password', message: 'Invalid' },
                ],
            };
        }

        //session
        req.session.userId = existingUser.id;

        return {
            code: 200,
            success: true,
            message: 'Login successfully',
            result: existingUser,
        };
    }

    //Logout
    @Mutation((_return) => Boolean)
    async Logout(@Ctx() { req, res }: Context): Promise<boolean> {
        return new Promise((resolve) => {
            //clear cookie at browser
            res.clearCookie(COOKIES_NAME);

            //destroy session at server
            req.session.destroy((err) => {
                if (err) {
                    Logger.error(err);
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }
}
