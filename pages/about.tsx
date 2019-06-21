import { NextFunctionComponent } from 'next';
import Head from '../components/meta/head';

const About: NextFunctionComponent = () => (
    <>
        <Head title="About" />
        <h1>About</h1>
        <p>
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Curabitur blandit tempus porttitor. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Nullam quis risus eget urna
            mollis ornare vel eu leo. Aenean eu leo quam. Pellentesque ornare
            sem lacinia quam venenatis vestibulum.
        </p>
    </>
);

export default About;
