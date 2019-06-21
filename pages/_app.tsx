import React from 'react';
import App, {
    Container,
    DefaultAppIProps,
    AppProps,
    NextAppContext,
} from 'next/app';
import Layout from '../components/layout/layout';

type CombinedProps = DefaultAppIProps & AppProps;

export default class MyApp extends App<CombinedProps> {
    static async getInitialProps({ Component, ctx }: NextAppContext) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Container>
        );
    }
}
