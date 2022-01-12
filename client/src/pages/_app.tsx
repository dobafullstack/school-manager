import '../assets/css/loading.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/quicksand';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, Suspense } from 'react';
import AppLayout from '../Layout/AppLayout';
import theme from '../theme';
import Loading from '../components/Loading';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
});

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);

    return (
        <ApolloProvider client={client}>
            <ChakraProvider resetCSS theme={theme}>
                {getLayout(<Component {...pageProps} />)}
            </ChakraProvider>
        </ApolloProvider>
    );
}

export default MyApp;
