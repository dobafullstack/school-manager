import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import AddSchoolModal from '../../components/School/AddNewModel';
import Loading from '../../components/Loading';
import { School, useGetAllSchoolQuery } from '../../graphql/generated/graphql';
import ListItem from '../../components/School/ListItem';
import City from '../../models/City';
import cityApi from '../../api/cityApi';

export default function school(): ReactElement {
    const [cities, setCities] = useState<City[]>([]);
    const { data, loading, error } = useGetAllSchoolQuery();
    const router = useRouter();

    useEffect(() => {
        cityApi.getCities().then((res) => setCities(res));
    }, []);

    if (error) router.push('/404');

    return (
        <>
            <AddSchoolModal cities={cities} setCities={setCities} />
            {loading ? (
                <Box w="100%" h="100%">
                    <Loading minH="100%" />
                </Box>
            ) : (
                <Box>
                    {data.GetAllSchool.map((item) => (
                        <ListItem item={item as School} cities={cities}/>
                    ))}
                </Box>
            )}
        </>
    );
}
