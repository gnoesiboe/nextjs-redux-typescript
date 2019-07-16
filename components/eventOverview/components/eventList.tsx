import { Children } from 'react';
import { NextComponentType } from 'next';

type Props = {
    children: React.ReactNode[];
};

const EventList: NextComponentType<Props> = ({ children }) => (
    <>
        <ul>
            {Children.map(children, (child, index) => (
                <li key={index}>{child}</li>
            ))}
        </ul>
        <style jsx>{`
            ul {
                padding: 0;
                margin: 0;
            }

            li {
                padding: 0;
                margin: 0;
            }
        `}</style>
    </>
);

export default EventList;
