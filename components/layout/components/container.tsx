import React from 'react';
import { NextFunctionComponent } from 'next';

type Props = {
    children: React.ReactNode | React.ReactNode[];
};

const Container: NextFunctionComponent<Props> = ({ children }) => (
    <div>
        {children}
        <style jsx>{`
            div {
                background: #ddd;
                max-width: 1040px;
                padding: 10px;
            }
        `}</style>
    </div>
);

export default Container;
