import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { ReactElement } from 'react';
import CustomInput from '../components/Common/CustomInput';
import mainBg from '../assets/images/bg3.png';
import NextLink from 'next/link';
import UserLayout from '../Layout/UserLayout';

interface Props {}

export default function Register({}: Props): ReactElement {
    const initialValues = {
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const onSubmit = async (
        values: typeof initialValues,
        {}: FormikHelpers<typeof initialValues>
    ) => {};

    return (
        <>
            <Text fontWeight="bold" textAlign="center" fontSize="2.5rem">
                Register
            </Text>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <CustomInput
                            name="username"
                            placeholder="Username"
                            type="text"
                            label="Username"
                        />
                        <CustomInput name="name" placeholder="Name" type="text" label="Name" />
                        <CustomInput name="email" placeholder="Email" type="text" label="Email" />
                        <CustomInput
                            name="password"
                            placeholder="Password"
                            type="password"
                            label="Password"
                        />
                        <CustomInput
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            label="Confirm Password"
                        />
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
                                Register
                            </Button>
                        </Flex>
                        <Flex justify="center" mt={10}>
                            <NextLink href="/login" passHref>
                                <Link>Already have an account?</Link>
                            </NextLink>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    );
}

Register.getLayout = function getLayout(page: ReactElement) {
    return <UserLayout>{page}</UserLayout>;
};
