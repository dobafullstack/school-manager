import { Arg, FieldResolver, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import Class from "../Entities/Class";
import ClassInput from "../Types/InputType/ClassInput";
import MutationResponse from "../Types/Mutation/MutationResponse";
import _ from 'lodash';
import Student from "../Entities/Student";
import User from "../Entities/User";
import School from "../Entities/School";
import { Authentication, Authorization, Strict } from "../Middlewares/Auth.middleware";

@ObjectType()
class ClassMutationResponse extends MutationResponse(Class){}

@Resolver((_return) => Class)
export default class ClassResolver {
    //Students Field
    @FieldResolver((_return) => [Student])
    async students(@Root() root: Class): Promise<Student[]> {
        const students = await Student.find({ classId: root.id });

        return students;
    }

    //Teacher Field
    @FieldResolver((_return) => User, { nullable: true })
    async teacher(@Root() root: Class): Promise<User | null> {
        const teacher = await User.findOne(root.teacherId);

        if (!teacher) return null;

        return teacher;
    }

    //School Field
    @FieldResolver((_return) => School, { nullable: true })
    async school(@Root() root: Class): Promise<School | null> {
        const school = await School.findOne(root.schoolId);

        if (!school) return null;

        return school;
    }

    //Create a class
    @UseMiddleware(Authentication)
    @UseMiddleware(Strict)
    @Mutation((_return) => ClassMutationResponse)
    async CreateClass(
        @Arg('createClassInput') createClassInput: ClassInput
    ): Promise<ClassMutationResponse> {
        const existingClass = await Class.findOne({ name: createClassInput.name });

        if (existingClass) {
            return {
                code: 400,
                success: false,
                message: 'Duplicate class',
                errors: [{ field: 'name', message: 'Class name is already exist' }],
            };
        }

        const newClass = Class.create(createClassInput);

        return {
            code: 201,
            success: true,
            message: 'Create Class Successfully',
            result: await Class.save(newClass),
        };
    }

    //Get All class
    @UseMiddleware(Authentication)
    @UseMiddleware(Authorization)
    @Query((_return) => [Class])
    async GetAllClass(): Promise<Class[]> {
        const classes = await Class.find();

        return classes;
    }

    //Get Detail Class
    @UseMiddleware(Authentication)
    @UseMiddleware(Authorization)
    @Query((_return) => Class, { nullable: true })
    async GetDetailClass(@Arg('classId') classId: number): Promise<Class | null> {
        const c = await Class.findOne(classId);

        if (!c) return null;

        return c;
    }

    //Update class
    @UseMiddleware(Authentication)
    @UseMiddleware(Strict)
    @Mutation((_return) => ClassMutationResponse)
    async UpdateClass(
        @Arg('updateClassInput') updateClassInput: ClassInput
    ): Promise<ClassMutationResponse> {
        const existingClass = await Class.findOne(updateClassInput.id);

        if (!existingClass) {
            return {
                code: 400,
                success: false,
                message: 'Can not find any class',
                errors: [{ field: 'id', message: 'Invalid id' }],
            };
        }

        _.extend(existingClass, updateClassInput);
        await existingClass.save();

        return {
            code: 200,
            success: true,
            message: 'Update Class Successfully',
        };
    }

    //Delete class
    @UseMiddleware(Authentication)
    @UseMiddleware(Strict)
    @Mutation((_return) => ClassMutationResponse)
    async DeleteClass(@Arg('classId') classId: number): Promise<ClassMutationResponse> {
        const existingClass = await Class.findOne(classId);

        if (!existingClass) {
            return {
                code: 400,
                success: false,
                message: 'Can not find any class',
                errors: [{ field: 'id', message: 'Invalid id' }],
            };
        }

        await Class.remove(existingClass);

        return {
            code: 200,
            success: true,
            message: 'Update Class Successfully',
        };
    }
}