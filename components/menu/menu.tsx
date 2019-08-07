import {
    home as homeRoute,
    about as aboutRoute,
    eventOverview as eventOverviewRoute,
} from '../../routing/urlGenerator';
import MenuItem from './menuItem';
import { withRouter, Router } from 'next/router';
import { NextPageContext, NextComponentType } from 'next';

type Props = {
    router: Router;
};

const checkIsEventPath = (currentPath: string): boolean => {
    return (
        currentPath === eventOverviewRoute.path ||
        currentPath.includes('/events', 0)
    );
};

const Menu: NextComponentType<NextPageContext, {}, Props> = ({ router }) => {
    const currentPath = typeof router !== 'undefined' ? router.pathname : '';

    return (
        <nav>
            <style jsx>{`
                ul {
                    margin: 0;
                    padding: 0;
                    display: block;
                    width: 100%;
                    background: #000;
                }

                li {
                    display: inline-block;
                }
            `}</style>
            <ul>
                <li>
                    <MenuItem
                        href={homeRoute.page}
                        active={currentPath === homeRoute.path}
                    >
                        Home
                    </MenuItem>
                </li>
                <li>
                    <MenuItem
                        href={eventOverviewRoute.page}
                        active={checkIsEventPath(currentPath)}
                    >
                        Events
                    </MenuItem>
                </li>
                <li>
                    <MenuItem
                        href={aboutRoute.page}
                        active={currentPath === aboutRoute.path}
                    >
                        About
                    </MenuItem>
                </li>
            </ul>
        </nav>
    );
};

export default withRouter(Menu);
