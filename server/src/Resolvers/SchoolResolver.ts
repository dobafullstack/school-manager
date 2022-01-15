import _ from 'lodash';
import {
    Arg,
    FieldResolver,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
    UseMiddleware
} from 'type-graphql';
import Logger from '../Configs/Logger';
import Class from '../Entities/Class';
import School from '../Entities/School';
import User from '../Entities/User';
import { Authentication, Strict } from '../Middlewares/Auth.middleware';
import { ServerInterVal } from '../Types/ErrorResponse';
import SchoolInput from '../Types/InputType/SchoolInput';
import MutationResponse from '../Types/Mutation/MutationResponse';

@ObjectType()
class SchoolMutationResponse extends MutationResponse(School) {}

@Resolver((_return) => School)
export default class SchoolResolver {
    //Field teachers
    @FieldResolver((_return) => [User])
    async teachers(@Root() root: School): Promise<User[]> {
        const teachers = await User.find({
            schoolId: root.id,
        });

        return teachers;
    }

    //Field Classes
    @FieldResolver((_return) => [Class])
    async classes(@Root() root: School): Promise<Class[]> {
        const classes = await Class.find({
            schoolId: root.id,
        });

        return classes;
    }

    //Get All School
    @Query((_return) => [School])
    async GetAllSchool(): Promise<School[]> {
        const schools = await School.find({});

        return schools;
    }

    //Get Detail School
    @Query((_return) => School, { nullable: true })
    async GetSchoolById(@Arg('schoolId') schoolId: number): Promise<School | null> {
        const school = await School.findOne(schoolId);

        if (school) return school;

        return null;
    }

    //Create a school
    @UseMiddleware(Authentication)
    @UseMiddleware(Strict)
    @Mutation((_return) => SchoolMutationResponse)
    async CreateSchool(
        @Arg('createSchoolInput') createSchoolInput: SchoolInput
    ): Promise<SchoolMutationResponse> {
        try {
            const existingSchool = await School.findOne({ name: createSchoolInput.name });

            if (existingSchool) {
                return {
                    code: 400,
                    success: false,
                    message: 'School is already exist',
                    errors: [{ field: 'name', message: 'Duplicate name' }],
                };
            }

            const newSchool = School.create(createSchoolInput);

            return {
                code: 201,
                success: true,
                message: 'Create School Successfully',
                result: await School.save(newSchool),
            };
        } catch (error) {
            Logger.error(error);
            return ServerInterVal;
        }
    }

    //Update a school
    @UseMiddleware(Authentication)
    @UseMiddleware(Strict)
    @Mutation((_return) => SchoolMutationResponse)
    async UpdateSchool(
        @Arg('updateSchoolInput') updateSchoolInput: SchoolInput
    ): Promise<SchoolMutationResponse> {
        try {
            const existingSchool = await School.findOne(updateSchoolInput.id);

            if (!existingSchool) {
                return {
                    code: 400,
                    success: false,
                    message: 'Can not find any school',
                };
            }

            //update school here
            _.extend(existingSchool, updateSchoolInput);
            await existingSchool.save();

            return {
                code: 200,
                success: true,
                message: 'Update School Successfully',
                result: existingSchool,
            };
        } catch (error) {
            Logger.error(error);
            return ServerInterVal;
        }
    }

    //Delete a school
    @UseMiddleware(Authentication)
    @UseMiddleware(Strict)
    @Mutation((_return) => SchoolMutationResponse)
    async DeleteSchool(@Arg('schoolId') schoolId: number): Promise<SchoolMutationResponse> {
        try {
            const existingSchool = await School.findOne(schoolId);

            if (!existingSchool) {
                return {
                    code: 400,
                    success: false,
                    message: 'Can not find any school',
                };
            }

            School.remove(existingSchool);

            return {
                code: 200,
                success: true,
                message: 'Delete School Successfully',
                result: existingSchool,
            };
        } catch (error) {
            Logger.error(error);
            return ServerInterVal;
        }
    }
}
