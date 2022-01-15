import { Box, Flex } from '@chakra-ui/react';
import router from 'next/router';
import React, { ReactElement } from 'react';
import Loading from '../components/Common/Loading';
import { useGetMyUserQuery } from '../graphql/generated/graphql';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props): ReactElement {
    const { data, loading, error } = useGetMyUserQuery();

    if (data?.GetMyUser === null) {
        typeof window !== 'undefined' && router.replace('/login');
    } else {
        if (error) typeof window !== 'undefined' && router.push('/404');

        if (loading) return <Loading />;

        return (
            <>
                <Navbar />
                <Flex minH="calc(100vh - 5rem)">
                    <Sidebar />
                    <Box pt={10} px={10} flexGrow={1} bg="gray.50">
                        {children}
                    </Box>
                </Flex>
            </>
        );
    }

    return <></>;
}
