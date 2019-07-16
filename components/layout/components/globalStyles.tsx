import { NextComponentType } from 'next';

const GlobalStyles: NextComponentType = () => (
    <style global={true} jsx={true}>{`
        body {
            background: #6d2727;
            color: #333;
        }
    `}</style>
);

export default GlobalStyles;
