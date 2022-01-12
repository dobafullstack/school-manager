import _ from 'lodash';
import { Arg, FieldResolver, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import Class from '../Entities/Class';
import Student from '../Entities/Student';
import { Authentication, Authorization } from '../Middlewares/Auth.middleware';
import StudentInput from '../Types/InputType/StudentInput';
import MutationResponse from '../Types/Mutation/MutationResponse';

@ObjectType()
class StudentMutationResponse extends MutationResponse(Student) {}

@Resolver((_return) => Student)
export default class StudentResolver {
    //Class Field
    @FieldResolver((_return) => Class, { nullable: true })
    async class(@Root() root: Student): Promise<Class | null> {
        const c = await Class.findOne(root.classId);

        if (!c) return null;

        return c;
    }

    //Create a student
    @UseMiddleware(Authentication)
    @UseMiddleware(Authorization)
    @Mutation((_return) => StudentMutationResponse)
    async CreateStudent(
        @Arg('createStudentInput') createStudentInput: StudentInput
    ): Promise<StudentMutationResponse> {
        const newStudent = Student.create(createStudentInput);

        return {
            code: 201,
            success: true,
            message: 'Create Student Successfully',
            result: await Student.save(newStudent),
        };
    }

    //Get All student
    @UseMiddleware(Authentication)
    @UseMiddleware(Authorization)
    @Query((_return) => [Student])
    async GetAllStudent(): Promise<Student[]> {
        const students = await Student.find();

        return students;
    }

    //Get Detail student
    @UseMiddleware(Authentication)
    @UseMiddleware(Authorization)
    @Query((_return) => Student, { nullable: true })
    async GetDetailStudent(@Arg('studentId') studentId: number): Promise<Student | null> {
        const student = await Student.findOne(studentId);

        if (!student) return null;

        return student;
    }

    //Update student
    @UseMiddleware(Authentication)
    @UseMiddleware(Authorization)
    @Mutation((_return) => StudentMutationResponse)
    async UpdateStudent(
        @Arg('updateStudentInput') updateStudentInput: StudentInput
    ): Promise<StudentMutationResponse> {
        const existingStudent = await Student.findOne(updateStudentInput.id);

        if (!existingStudent) {
            return {
                code: 400,
                success: false,
                message: 'Can not find any student',
                errors: [{ field: 'id', message: 'Invalid id' }],
            };
        }

        _.extend(existingStudent, updateStudentInput);
        await existingStudent.save();

        return {
            code: 200,
            success: true,
            message: 'Update Student Successfully',
        };
    }

    //Delete student
    @UseMiddleware(Authentication)
    @UseMiddleware(Authorization)
    @Mutation((_return) => StudentMutationResponse)
    async DeleteStudent(@Arg('studentId') studentId: number): Promise<StudentMutationResponse> {
        const existingStudent = await Student.findOne(studentId);

        if (!existingStudent) {
            return {
                code: 400,
                success: false,
                message: 'Can not find any student',
                errors: [{ field: 'id', message: 'Invalid id' }],
            };
        }

        await Student.remove(existingStudent);

        return {
            code: 200,
            success: true,
            message: 'Update Student Successfully',
        };
    }
}
