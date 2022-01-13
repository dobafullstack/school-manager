import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Class = {
  __typename?: 'Class';
  createdAt: Scalars['DateTime'];
  grade: Scalars['Float'];
  id: Scalars['ID'];
  name: Scalars['String'];
  school?: Maybe<School>;
  schoolId: Scalars['Float'];
  students: Array<Student>;
  teacher?: Maybe<User>;
  teacherId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ClassInput = {
  grade?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  schoolId?: InputMaybe<Scalars['Float']>;
  teacherId?: InputMaybe<Scalars['Float']>;
};

export type ClassMutationResponse = {
  __typename?: 'ClassMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  result?: Maybe<Class>;
  success: Scalars['Boolean'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateClass: ClassMutationResponse;
  CreateSchool: SchoolMutationResponse;
  CreateStudent: StudentMutationResponse;
  DeleteClass: ClassMutationResponse;
  DeleteSchool: SchoolMutationResponse;
  DeleteStudent: StudentMutationResponse;
  DeleteUser: UserMutationResponse;
  Login: UserMutationResponse;
  Logout: Scalars['Boolean'];
  Register: UserMutationResponse;
  UpdateClass: ClassMutationResponse;
  UpdateMyUser: UserMutationResponse;
  UpdateSchool: SchoolMutationResponse;
  UpdateStudent: StudentMutationResponse;
  UpdateUser: UserMutationResponse;
};


export type MutationCreateClassArgs = {
  createClassInput: ClassInput;
};


export type MutationCreateSchoolArgs = {
  createSchoolInput: SchoolInput;
};


export type MutationCreateStudentArgs = {
  createStudentInput: StudentInput;
};


export type MutationDeleteClassArgs = {
  classId: Scalars['Float'];
};


export type MutationDeleteSchoolArgs = {
  schoolId: Scalars['Float'];
};


export type MutationDeleteStudentArgs = {
  studentId: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Float'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationUpdateClassArgs = {
  updateClassInput: ClassInput;
};


export type MutationUpdateMyUserArgs = {
  updateUserInput: RegisterInput;
};


export type MutationUpdateSchoolArgs = {
  updateSchoolInput: SchoolInput;
};


export type MutationUpdateStudentArgs = {
  updateStudentInput: StudentInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  GetAllClass: Array<Class>;
  GetAllSchool: Array<School>;
  GetAllStudent: Array<Student>;
  GetAllUsers: Array<User>;
  GetDetailClass?: Maybe<Class>;
  GetDetailStudent?: Maybe<Student>;
  GetMyUser?: Maybe<User>;
  GetSchoolById?: Maybe<School>;
};


export type QueryGetDetailClassArgs = {
  classId: Scalars['Float'];
};


export type QueryGetDetailStudentArgs = {
  studentId: Scalars['Float'];
};


export type QueryGetSchoolByIdArgs = {
  schoolId: Scalars['Float'];
};

export type RegisterInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  schoolId?: InputMaybe<Scalars['Float']>;
  username?: InputMaybe<Scalars['String']>;
};

export type School = {
  __typename?: 'School';
  city: Scalars['String'];
  classes: Array<Class>;
  createdAt: Scalars['String'];
  district: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  teachers: Array<User>;
  updatedAt: Scalars['String'];
};

export type SchoolInput = {
  city?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
};

export type SchoolMutationResponse = {
  __typename?: 'SchoolMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  result?: Maybe<School>;
  success: Scalars['Boolean'];
};

export type Student = {
  __typename?: 'Student';
  age: Scalars['Float'];
  class?: Maybe<Class>;
  classId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type StudentInput = {
  age?: InputMaybe<Scalars['Float']>;
  classId?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type StudentMutationResponse = {
  __typename?: 'StudentMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  result?: Maybe<Student>;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  class?: Maybe<Class>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  school?: Maybe<School>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UserMutationResponse = {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  result?: Maybe<User>;
  success: Scalars['Boolean'];
};

export type ClassInfoFragment = { __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any, teacher?: { __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, role: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined, school?: { __typename?: 'School', id: string, city: string, district: string, name: string, createdAt: string, updatedAt: string } | null | undefined, students: Array<{ __typename?: 'Student', id: string, name: string, age: number, phone?: string | null | undefined, createdAt: any, updatedAt: any }> };

export type ClassMutationFragment = { __typename?: 'ClassMutationResponse', code: number, success: boolean, message: string, result?: { __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any, teacher?: { __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, role: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined, school?: { __typename?: 'School', id: string, city: string, district: string, name: string, createdAt: string, updatedAt: string } | null | undefined, students: Array<{ __typename?: 'Student', id: string, name: string, age: number, phone?: string | null | undefined, createdAt: any, updatedAt: any }> } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type FieldErrorsFragment = { __typename?: 'FieldError', field: string, message: string };

export type SchoolInfoFragment = { __typename?: 'School', id: string, city: string, district: string, name: string, createdAt: string, updatedAt: string, teachers: Array<{ __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, password: string, role: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined }>, classes: Array<{ __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any }> };

export type SchoolMutationFragment = { __typename?: 'SchoolMutationResponse', code: number, success: boolean, message: string, result?: { __typename?: 'School', id: string, city: string, district: string, name: string, createdAt: string, updatedAt: string, teachers: Array<{ __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, password: string, role: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined }>, classes: Array<{ __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any }> } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type StudentInfoFragment = { __typename?: 'Student', id: string, name: string, age: number, phone?: string | null | undefined, createdAt: any, updatedAt: any, class?: { __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any } | null | undefined };

export type StudentMutationFragment = { __typename?: 'StudentMutationResponse', code: number, success: boolean, message: string, result?: { __typename?: 'Student', id: string, name: string, age: number, phone?: string | null | undefined, createdAt: any, updatedAt: any, class?: { __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any } | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type UserInfoFragment = { __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, role: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, school?: { __typename?: 'School', id: string, city: string, district: string, name: string, createdAt: string, updatedAt: string } | null | undefined, class?: { __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any } | null | undefined };

export type UserMutationFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string, result?: { __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, role: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, school?: { __typename?: 'School', id: string, city: string, district: string, name: string, createdAt: string, updatedAt: string } | null | undefined, class?: { __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any } | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type CreateSchoolMutationVariables = Exact<{
  createSchoolInput: SchoolInput;
}>;


export type CreateSchoolMutation = { __typename?: 'Mutation', CreateSchool: { __typename?: 'SchoolMutationResponse', code: number, success: boolean, message: string, result?: { __typename?: 'School', id: string, city: string, district: string, name: string, createdAt: string, updatedAt: string, teachers: Array<{ __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, password: string, role: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined }>, classes: Array<{ __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any }> } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', Login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string, result?: { __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, role: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, school?: { __typename?: 'School', id: string, city: string, district: string, name: string, createdAt: string, updatedAt: string } | null | undefined, class?: { __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any } | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', Logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', Register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string, result?: { __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, role: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, school?: { __typename?: 'School', id: string, city: string, district: string, name: string, createdAt: string, updatedAt: string } | null | undefined, class?: { __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any } | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type GetAllSchoolQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSchoolQuery = { __typename?: 'Query', GetAllSchool: Array<{ __typename?: 'School', id: string, city: string, district: string, name: string, createdAt: string, updatedAt: string, teachers: Array<{ __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, password: string, role: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined }>, classes: Array<{ __typename?: 'Class', id: string, name: string, grade: number, createdAt: any, updatedAt: any }> }> };

export type GetMyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyUserQuery = { __typename?: 'Query', GetMyUser?: { __typename?: 'User', id: string, username: string, email?: string | null | undefined, name: string, role: string } | null | undefined };

export const ClassInfoFragmentDoc = gql`
    fragment classInfo on Class {
  id
  name
  grade
  teacher {
    id
    username
    email
    name
    role
    createdAt
    updatedAt
  }
  school {
    id
    city
    district
    name
    createdAt
    updatedAt
  }
  students {
    id
    name
    age
    phone
    createdAt
    updatedAt
  }
  createdAt
  updatedAt
}
    `;
export const FieldErrorsFragmentDoc = gql`
    fragment fieldErrors on FieldError {
  field
  message
}
    `;
export const ClassMutationFragmentDoc = gql`
    fragment classMutation on ClassMutationResponse {
  code
  success
  message
  result {
    ...classInfo
  }
  errors {
    ...fieldErrors
  }
}
    ${ClassInfoFragmentDoc}
${FieldErrorsFragmentDoc}`;
export const SchoolInfoFragmentDoc = gql`
    fragment schoolInfo on School {
  id
  city
  district
  name
  teachers {
    id
    username
    email
    name
    password
    role
    createdAt
    updatedAt
  }
  classes {
    id
    name
    grade
    createdAt
    updatedAt
  }
  createdAt
  updatedAt
}
    `;
export const SchoolMutationFragmentDoc = gql`
    fragment schoolMutation on SchoolMutationResponse {
  code
  success
  message
  result {
    ...schoolInfo
  }
  errors {
    ...fieldErrors
  }
}
    ${SchoolInfoFragmentDoc}
${FieldErrorsFragmentDoc}`;
export const StudentInfoFragmentDoc = gql`
    fragment studentInfo on Student {
  id
  name
  age
  phone
  class {
    id
    name
    grade
    createdAt
    updatedAt
  }
  createdAt
  updatedAt
}
    `;
export const StudentMutationFragmentDoc = gql`
    fragment studentMutation on StudentMutationResponse {
  code
  success
  message
  result {
    ...studentInfo
  }
  errors {
    ...fieldErrors
  }
}
    ${StudentInfoFragmentDoc}
${FieldErrorsFragmentDoc}`;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  school {
    id
    city
    district
    name
    createdAt
    updatedAt
  }
  class {
    id
    name
    grade
    createdAt
    updatedAt
  }
  username
  email
  name
  role
  createdAt
  updatedAt
}
    `;
export const UserMutationFragmentDoc = gql`
    fragment userMutation on UserMutationResponse {
  code
  success
  message
  result {
    ...userInfo
  }
  errors {
    ...fieldErrors
  }
}
    ${UserInfoFragmentDoc}
${FieldErrorsFragmentDoc}`;
export const CreateSchoolDocument = gql`
    mutation CreateSchool($createSchoolInput: SchoolInput!) {
  CreateSchool(createSchoolInput: $createSchoolInput) {
    ...schoolMutation
  }
}
    ${SchoolMutationFragmentDoc}`;
export type CreateSchoolMutationFn = Apollo.MutationFunction<CreateSchoolMutation, CreateSchoolMutationVariables>;

/**
 * __useCreateSchoolMutation__
 *
 * To run a mutation, you first call `useCreateSchoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSchoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSchoolMutation, { data, loading, error }] = useCreateSchoolMutation({
 *   variables: {
 *      createSchoolInput: // value for 'createSchoolInput'
 *   },
 * });
 */
export function useCreateSchoolMutation(baseOptions?: Apollo.MutationHookOptions<CreateSchoolMutation, CreateSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSchoolMutation, CreateSchoolMutationVariables>(CreateSchoolDocument, options);
      }
export type CreateSchoolMutationHookResult = ReturnType<typeof useCreateSchoolMutation>;
export type CreateSchoolMutationResult = Apollo.MutationResult<CreateSchoolMutation>;
export type CreateSchoolMutationOptions = Apollo.BaseMutationOptions<CreateSchoolMutation, CreateSchoolMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  Login(loginInput: $loginInput) {
    ...userMutation
  }
}
    ${UserMutationFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  Logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  Register(registerInput: $registerInput) {
    ...userMutation
  }
}
    ${UserMutationFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetAllSchoolDocument = gql`
    query GetAllSchool {
  GetAllSchool {
    ...schoolInfo
  }
}
    ${SchoolInfoFragmentDoc}`;

/**
 * __useGetAllSchoolQuery__
 *
 * To run a query within a React component, call `useGetAllSchoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSchoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSchoolQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSchoolQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSchoolQuery, GetAllSchoolQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSchoolQuery, GetAllSchoolQueryVariables>(GetAllSchoolDocument, options);
      }
export function useGetAllSchoolLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSchoolQuery, GetAllSchoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSchoolQuery, GetAllSchoolQueryVariables>(GetAllSchoolDocument, options);
        }
export type GetAllSchoolQueryHookResult = ReturnType<typeof useGetAllSchoolQuery>;
export type GetAllSchoolLazyQueryHookResult = ReturnType<typeof useGetAllSchoolLazyQuery>;
export type GetAllSchoolQueryResult = Apollo.QueryResult<GetAllSchoolQuery, GetAllSchoolQueryVariables>;
export const GetMyUserDocument = gql`
    query GetMyUser {
  GetMyUser {
    id
    username
    email
    name
    role
  }
}
    `;

/**
 * __useGetMyUserQuery__
 *
 * To run a query within a React component, call `useGetMyUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyUserQuery(baseOptions?: Apollo.QueryHookOptions<GetMyUserQuery, GetMyUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyUserQuery, GetMyUserQueryVariables>(GetMyUserDocument, options);
      }
export function useGetMyUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyUserQuery, GetMyUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyUserQuery, GetMyUserQueryVariables>(GetMyUserDocument, options);
        }
export type GetMyUserQueryHookResult = ReturnType<typeof useGetMyUserQuery>;
export type GetMyUserLazyQueryHookResult = ReturnType<typeof useGetMyUserLazyQuery>;
export type GetMyUserQueryResult = Apollo.QueryResult<GetMyUserQuery, GetMyUserQueryVariables>;