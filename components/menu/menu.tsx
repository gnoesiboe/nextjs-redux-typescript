import {
    homePath,
    aboutPath,
    eventOverviewPath,
} from '../../routing/urlGenerator';
import MenuItem from './menuItem';
import { withRouter, Router } from 'next/router';
import { NextPageContext, NextComponentType } from 'next';

type Props = {
    router: Router;
};

const checkIsEventPath = (currentPath: string): boolean => {
    return (
        currentPath === eventOverviewPath || currentPath.includes('/event', 0)
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
                    <MenuItem href={homePath} active={currentPath === homePath}>
                        Home
                    </MenuItem>
                </li>
                <li>
                    <MenuItem
                        href={eventOverviewPath}
                        active={checkIsEventPath(currentPath)}
                    >
                        Events
                    </MenuItem>
                </li>
                <li>
                    <MenuItem
                        href={aboutPath}
                        active={currentPath === aboutPath}
                    >
                        About
                    </MenuItem>
                </li>
            </ul>
        </nav>
    );
};

export default withRouter(Menu);
