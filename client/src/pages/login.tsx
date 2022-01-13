import { Button, Flex, Link, Text } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput';
import {
    GetMyUserDocument,
    GetMyUserQuery,
    LoginInput,
    useLoginMutation
} from '../graphql/generated/graphql';
import UserLayout from '../Layout/UserLayout';

interface Props {}

export default function Login({}: Props): ReactElement {
    const [login, { error, loading }] = useLoginMutation();
    const router = useRouter();

    const initialValues: LoginInput = {
        usernameOrEmail: '',
        password: '',
    };

    const validationSchema = yup.object().shape({
        usernameOrEmail: yup.string().required('Username or email are required'),
        password: yup.string().required('Password are required'),
    });

    const onSubmit = async (
        values: LoginInput,
        { setFieldError }: FormikHelpers<LoginInput>
    ) => {
        const response = await login({
            variables: {
                loginInput: values,
            },
            update(
                cache,
                {
                    data: {
                        Login: { result },
                    },
                }
            ) {
                cache.writeQuery<GetMyUserQuery>({
                    query: GetMyUserDocument,
                    data: { GetMyUser: result },
                });
            },
        });

        if (response) {
            if (response.data.Login.code === 200) {
                router.replace('/');
            } else {
                response.data.Login.errors.forEach((err) => {
                    setFieldError(err.field, err.message);
                });
            }
        }
    };

    if (error) router.push('/404');

    return (
        <>
            <Text fontWeight="bold" textAlign="center" fontSize="2.5rem">
                Login
            </Text>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {() => (
                    <Form>
                        <CustomInput
                            name="usernameOrEmail"
                            placeholder="Username or Email"
                            type="text"
                            label="Username or Email"
                        />
                        <CustomInput
                            name="password"
                            placeholder="Password"
                            type="password"
                            label="Password"
                        />
                        <Flex justify="flex-end">
                            <NextLink href="/forgot-password" passHref>
                                <Link>Forgot password?</Link>
                            </NextLink>
                        </Flex>
                        <Flex justify="center">
                            <Button
                                type="submit"
                                mt={5}
                                isLoading={loading}
                                variant="outline"
                                colorScheme="primary"
                                _hover={{
                                    backgroundColor: 'primary.200',
                                    color: 'white',
                                }}
                            >
                                Login
                            </Button>
                        </Flex>
                        <Flex justify="center" mt={10}>
                            <NextLink href="/register" passHref>
                                <Link>Do not have an account?</Link>
                            </NextLink>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    );
}

Login.getLayout = function getLayout(page: ReactElement) {
    return <UserLayout>{page}</UserLayout>;
};
