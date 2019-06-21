import { NextFunctionComponent } from 'next';
import { withRouter } from 'next/router';
import {
    EventOverviewItem,
    EventOverviewResponse,
} from '../api/response/types';
import * as cache from '../api/response/cache';
import { executeGetRequest } from '../api/client';
import { apiEventOverviewPath } from '../api/urlGenerator';

type Props = {
    data?: EventOverviewItem;
};

const Event: NextFunctionComponent<Props> = ({ data }) => {
    if (!data) {
        // @todo 404 response?

        return null;
    }

    return (
        <div>
            {data && (
                <>
                    <h1>{data.title}</h1>
                    {data.images.map((src, index) => (
                        <img src={src} key={index} />
                    ))}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data.description || '',
                        }}
                    />
                    <a href={data.url} target="_blank">
                        Ga naar website
                    </a>
                </>
            )}
        </div>
    );
};

Event.getInitialProps = async function({ query }) {
    if (!query || !query.id) {
        return {};
    }

    const idAsString = query.id;

    if (typeof idAsString !== 'string') {
        return {};
    }

    const id = parseInt(idAsString, 10);

    const allEvents = await cache.getOrCreate<EventOverviewResponse>(
        cache.CacheIdentifier.Events,
        async () => {
            const response = await executeGetRequest<EventOverviewResponse>(
                apiEventOverviewPath
            );

            return response.data;
        }
    );

    const data = allEvents.find(cursorItem => cursorItem.id === id);

    return { data };
};

export default withRouter(Event);
