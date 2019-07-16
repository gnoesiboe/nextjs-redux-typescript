import Head from '../meta/head';
import Menu from '../menu/menu';
import GlobalStyles from './components/globalStyles';
import Container from './components/container';
import { NextPageContext, NextComponentType } from 'next';

type Props = {
    children: React.ReactChild | React.ReactChild[];
};

const Layout: NextComponentType<NextPageContext, {}, Props> = ({
    children,
}) => (
    <>
        <Head />
        <Container>
            <Menu />
            {children}
        </Container>
        <GlobalStyles />
    </>
);

export default Layout;
