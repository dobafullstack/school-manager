import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Loading from '../components/Loading';
import { useGetMyUserQuery } from '../graphql/generated/graphql';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props): ReactElement {
    const { data, loading, error } = useGetMyUserQuery();
    const router = useRouter();

    if (data?.GetMyUser === null) {
        router.replace('/login');
    } else {
        if (error) router.push('/404');

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
