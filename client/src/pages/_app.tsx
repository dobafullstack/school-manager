import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/quicksand';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import '../assets/css/loading.css';
import { useApollo } from '../graphql/apolloClient';
import AppLayout from '../Layout/AppLayout';
import store from '../redux/store';
import theme from '../theme';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const client = useApollo(pageProps);
    const getLayout = Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);

    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <ChakraProvider resetCSS theme={theme}>
                    {getLayout(
                        <ToastProvider
                            autoDismiss
                            autoDismissTimeout={6000}
                            placement="bottom-left"
                        >
                            <Component {...pageProps} />
                        </ToastProvider>
                    )}
                </ChakraProvider>
            </Provider>
        </ApolloProvider>
    );
}

export default MyApp;
