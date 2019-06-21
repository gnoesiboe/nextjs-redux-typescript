import {
    homePath,
    aboutPath,
    eventOverviewPath,
} from '../../routing/urlGenerator';
import MenuItem from './menuItem';
import { withRouter, WithRouterProps } from 'next/router';
import { NextFunctionComponent } from 'next';

type Props = WithRouterProps;

const checkIsEventPath = (currentPath: string): boolean => {
    return (
        currentPath === eventOverviewPath || currentPath.includes('/event', 0)
    );
};

const Menu: NextFunctionComponent<Props> = ({ router }) => {
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
