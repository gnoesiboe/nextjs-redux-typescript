import React from 'react';
import Link from 'next/link';
import { NextPageContext, NextComponentType } from 'next';

type Props = {
    href: string;
    active: boolean;
    children: string;
};

const MenuItem: NextComponentType<NextPageContext, {}, Props> = ({
    href,
    active,
    children,
}) => (
    <>
        <Link href={href}>
            <a>{children}</a>
        </Link>
        <style jsx>{`
            a {
                display: block;
                padding: 10px 20px;
                color: white;
                text-decoration: none;
                background: ${active ? '#333' : 'inherit'};
            }
        `}</style>
    </>
);

export default MenuItem;
