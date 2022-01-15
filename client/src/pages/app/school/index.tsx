import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import AddSchoolModal from '../../../components/School/AddNewModel';
import Loading from '../../../components/Common/Loading';
import { GetAllSchoolDocument, School, useGetAllSchoolQuery } from '../../../graphql/generated/graphql';
import ListItem from '../../../components/School/ListItem';
import City from '../../../models/City';
import cityApi from '../../../api/cityApi';
import ContextMenuComponent from '../../../components/Common/ContextMenu';
import { addApolloState, initializeApollo } from '../../../graphql/apolloClient';

const school = (): ReactElement => {
    const [cities, setCities] = useState<City[]>([]);
    const [selectedItem, setSelectedItem] = useState<number>();
    const { data, loading, error } = useGetAllSchoolQuery();
    const router = useRouter();

    const onEdit = (e, data) => {
        setSelectedItem(parseInt(data.target.id));
    };

    const onDelete = (e, data) => {
        setSelectedItem(parseInt(data.target.id));
    };

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
                        <ListItem item={item as School} cities={cities} key={item.id} />
                    ))}
                </Box>
            )}

            <ContextMenuComponent onDelete={onDelete} onEdit={onEdit} />
        </>
    );
}

export const getStaticProps = async () => {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: GetAllSchoolDocument,
    });

    return addApolloState(apolloClient, {
        props: {}
    })
}

export default school;

