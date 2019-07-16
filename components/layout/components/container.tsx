import React from 'react';
import { NextPageContext, NextComponentType } from 'next';

type Props = {
    children: React.ReactNode | React.ReactNode[];
};

const Container: NextComponentType<NextPageContext, {}, Props> = ({
    children,
}) => (
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
