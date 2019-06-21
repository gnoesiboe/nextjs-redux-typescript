import NextHead from 'next/head';
import { NextFunctionComponent } from 'next';

type Props = {
    title?: string;
};

const Head: NextFunctionComponent<Props> = ({ title }) => (
    <NextHead>
        <title>{title ? `${title} |` : ''} NextJS</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </NextHead>
);

export default Head;
