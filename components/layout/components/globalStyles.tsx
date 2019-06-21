import { NextFunctionComponent } from 'next';

const GlobalStyles: NextFunctionComponent = () => (
    <style global={true} jsx={true}>{`
        body {
            background: #6d2727;
            color: #333;
        }
    `}</style>
);

export default GlobalStyles;
