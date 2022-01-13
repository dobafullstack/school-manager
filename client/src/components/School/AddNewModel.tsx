import { FormControl, FormErrorMessage, FormLabel, Select, useDisclosure } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';
import { GetAllSchoolDocument, GetAllSchoolQuery, SchoolInput, useCreateSchoolMutation } from '../../graphql/generated/graphql';
import City from '../../models/City';
import AddNewDrawer from '../AddNewDrawer';
import CustomInput from '../CustomInput';

interface Props {
    cities: City[];
    setCities: Dispatch<SetStateAction<City[]>>;
}

export default function School({ cities, setCities }: Props): ReactElement {
    const [createSchool, { loading }] = useCreateSchoolMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { addToast } = useToasts();

    const initialValues: SchoolInput = {
        name: '',
        city: '',
        district: '',
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        city: yup.string().required('City is required'),
        district: yup.string().required('District is required'),
    });

    const onSubmit = async (
        values: SchoolInput,
        { setFieldError, resetForm }: FormikHelpers<SchoolInput>
    ) => {
        try {
            const response = await createSchool({
                variables: {
                    createSchoolInput: values,
                },
                update(cache, {data: {CreateSchool: {result}}}){
                    const curSchool = cache.readQuery<GetAllSchoolQuery>({query: GetAllSchoolDocument})
                    console.log({curSchool})
                    cache.writeQuery<GetAllSchoolQuery>({
                        query: GetAllSchoolDocument,
                        data: {GetAllSchool: curSchool.GetAllSchool.concat(result)}
                    })
                }
            });

            if (response.data.CreateSchool.success) {
                addToast(response.data.CreateSchool.message, { appearance: 'success' });
                resetForm();
                onClose();
            } else {
                response.data.CreateSchool.errors.forEach((err) => {
                    setFieldError(err.field, err.message);
                });
            }
        } catch (error) {
            addToast(error.message, { appearance: 'error' });
        }
    };

    return (
        <>
            <AddNewDrawer
                label="Create new school"
                formId="create-school"
                loading={loading}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, errors, touched, values }) => (
                        <Form id="create-school">
                            <FormControl isInvalid={errors.city && touched.city} mb={5}>
                                <FormLabel fontWeight="bold">City</FormLabel>
                                <Select
                                    placeholder="Select school's city"
                                    name="city"
                                    onChange={handleChange}
                                    isInvalid={errors.city && touched.city}
                                >
                                    {cities.map((city) => (
                                        <option key={city.key} value={city.key}>
                                            {city.name}
                                        </option>
                                    ))}
                                </Select>
                                {errors.city && touched.city ? (
                                    <FormErrorMessage>{errors.city}</FormErrorMessage>
                                ) : null}
                            </FormControl>
                            <FormControl isInvalid={errors.district && touched.district} mb={5}>
                                <FormLabel fontWeight="bold">District</FormLabel>
                                <Select
                                    placeholder="Select school's district"
                                    name="district"
                                    onChange={handleChange}
                                    isInvalid={errors.district && touched.district}
                                >
                                    {values.city !== '' &&
                                        cities
                                            .find((city) => city.key === values.city)
                                            .district.map((dis) => (
                                                <option value={dis.key} key={dis.key}>
                                                    {dis.name}
                                                </option>
                                            ))}
                                </Select>
                                {errors.district && touched.district ? (
                                    <FormErrorMessage>{errors.district}</FormErrorMessage>
                                ) : null}
                            </FormControl>
                            <CustomInput
                                label="Name"
                                name="name"
                                placeholder="School's name"
                                type="text"
                            />
                        </Form>
                    )}
                </Formik>
            </AddNewDrawer>
        </>
    );
}
