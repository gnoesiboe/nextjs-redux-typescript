import { NextFunctionComponent } from 'next';
import { EventOverviewResponse } from '../api/response/types';
import EventList from '../components/eventOverview/components/eventList';
import EventListItem from '../components/eventOverview/components/eventListItem';
import Head from '../components/meta/head';
import { executeGetRequest } from '../api/client';
import { apiEventOverviewPath } from '../api/urlGenerator';
import * as cache from '../api/response/cache';

type Props = {
    items: EventOverviewResponse;
};

const Overview: NextFunctionComponent<Props> = ({ items }) => {
    return (
        <div>
            <Head title="Events" />
            <h1>Event overview</h1>
            <EventList>
                {items.map(item => (
                    <EventListItem data={item} key={item.id} />
                ))}
            </EventList>
        </div>
    );
};

Overview.getInitialProps = async function() {
    const items = await cache.getOrCreate(
        cache.CacheIdentifier.Events,
        async () => {
            const response = await executeGetRequest<EventOverviewResponse>(
                apiEventOverviewPath
            );

            return response.data;
        }
    );

    return { items };
};

export default Overview;
