import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Loading from '../components/Loading';
import { useGetMyUserQuery } from '../graphql/generated/graphql';
import Navbar from './Navbar';

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props): ReactElement {
    const { data, loading, error } = useGetMyUserQuery();
    const router = useRouter();

    if (error) router.push('/404');

    if (loading) return <Loading />;

    if (data?.GetMyUser === null) router.replace('/login');

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
