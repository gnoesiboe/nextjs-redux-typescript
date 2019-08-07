import { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { EventOverviewItem } from '../../../api/response/types';
import { eventDetail as eventDetailRoute } from '../../../routing/urlGenerator';

type Props = {
    data: EventOverviewItem;
};

const EventListItem: NextComponentType<NextPageContext, {}, Props> = ({
    data: { id, title, performer, genre, startsAt },
}) => (
    <div>
        <Link as={eventDetailRoute.path(id)} href={eventDetailRoute.page}>
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
