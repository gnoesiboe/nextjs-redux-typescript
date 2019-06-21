import Head from '../components/meta/head';
import { NextFunctionComponent } from 'next';

const Home: NextFunctionComponent = () => (
    <>
        <Head title="Home" />
        <h1>Home</h1>
        <p>
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Curabitur blandit tempus porttitor. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Nullam quis risus eget urna
            mollis ornare vel eu leo. Aenean eu leo quam. Pellentesque ornare
            sem lacinia quam venenatis vestibulum.
        </p>
    </>
);

export default Home;
