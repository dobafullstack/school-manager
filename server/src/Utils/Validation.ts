import User from '../Entities/User';
import { ObjectType } from 'type-graphql';
import MutationResponse from '../Types/Mutation/MutationResponse';
import RegisterInput from '../Types/InputType/RegisterInput';
@ObjectType()
export class UserMutationResponse extends MutationResponse(User) {}

export const ValidateRegister = (registerInput: RegisterInput): UserMutationResponse | null => {
    const { username, email, password } = registerInput;

    //username
    if (username.length < 6){
        return {
            code: 400,
            success: false,
            message: 'Invalid username',
            errors: [{
                field: 'username',
                message: 'Username length must at least 6 characters'
            }]
        }
    }
    if (username.includes('@')){
        return {
            code: 400,
            success: false,
            message: 'Invalid username',
            errors: [{
                field: 'username',
                message: 'Username can not include @ symbol'
            }]
        }
    }
    
    //email
    if (email){
        if (!email.includes('@')) {
            return {
                code: 400,
                success: false,
                message: 'Invalid email',
                errors: [
                    {
                        field: 'email',
                        message: 'Email must include @ symbol',
                    },
                ],
            };
        }
    }
    
    //password
    if (password.length < 6){
        return {
            code: 400,
            success: false,
            message: 'Invalid password',
            errors: [{
                field: 'password',
                message: 'Password length must at least 6 characters'
            }]
        }
    }

    return null;
};
