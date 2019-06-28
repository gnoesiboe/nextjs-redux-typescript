import React from 'react';
import App, { Container, DefaultAppIProps, AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import { Provider as GlobalStateProvider } from 'react-redux';
import { Store } from '../globalState/types';
import withStore from '../hoc/withReduxStore';

type CombinedProps = DefaultAppIProps & AppProps & { store: Store };

class MyApp extends App<CombinedProps> {
    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <GlobalStateProvider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </GlobalStateProvider>
            </Container>
        );
    }
}

// @ts-ignore
export default withStore(MyApp);
