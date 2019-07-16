import { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { EventOverviewItem } from '../../../api/response/types';
import {
    createEventDetailPath,
    eventDetailPagePath,
} from '../../../routing/urlGenerator';

type Props = {
    data: EventOverviewItem;
};

const EventListItem: NextComponentType<NextPageContext, {}, Props> = ({
    data: { id, title, performer, genre, startsAt },
}) => (
    <div>
        <Link as={createEventDetailPath(id)} href={eventDetailPagePath}>
            <a>
                <h4>{title}</h4>
            </a>
        </Link>
        <p>
            <strong>Performer:</strong> {performer} | <strong>Genre:</strong>:{' '}
            {genre} | <strong>Starts at:</strong> {startsAt}
        </p>
        <style jsx>{`
            div {
                display: block;
                background: #ccc;
                padding: 10px 20px;
                margin-bottom: 10px;
            }
        `}</style>
    </div>
);

export default EventListItem;
