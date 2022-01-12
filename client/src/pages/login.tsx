import { Box, Button, Flex, Image, Text, Link } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { ReactElement } from 'react';
import CustomInput from '../components/CustomInput';
import mainBg from '../assets/images/bg3.png';
import NextLink from 'next/link';
import UserLayout from '../Layout/UserLayout';

interface Props {}

export default function Login({}: Props): ReactElement {
    const initialValues = {
        usernameOrEmail: '',
        password: '',
    };

    const onSubmit = async (values: typeof initialValues, {}: FormikHelpers<typeof initialValues>) => {

    };

    return (
        <>
            <Text fontWeight="bold" textAlign="center" fontSize="2.5rem">
                Login
            </Text>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
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
                                isLoading={isSubmitting}
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
