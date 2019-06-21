import { NextFunctionComponent } from 'next';
import Link from 'next/link';
import { EventOverviewItem } from '../../../api/response/types';
import { createEventDetailPath } from '../../../routing/urlGenerator';

type Props = {
    data: EventOverviewItem;
};

const EventListItem: NextFunctionComponent<Props> = ({
    data: { id, title, performer, genre, startsAt },
}) => (
    <div>
        <Link as={createEventDetailPath(id)} href={`/event?id=${id}`}>
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
