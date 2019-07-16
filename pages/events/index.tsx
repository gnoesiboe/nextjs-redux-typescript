import { NextComponentType } from 'next';
import { EventOverviewItem } from '../../api/response/types';
import EventList from '../../components/eventOverview/components/eventList';
import EventListItem from '../../components/eventOverview/components/eventListItem';
import Head from '../../components/meta/head';
import { connect } from 'react-redux';
import { GlobalState, DispatchProp, Store } from '../../globalState/types';
import { createFetchEventsAction } from '../../globalState/action/factory/eventsActionFactory';
import { ExtendedNextContext } from '../../hoc/withReduxStore';
import EventOverviewFiltering from '../../components/eventOverviewFiltering/eventOverviewFiltering';
import { useState, useCallback } from 'react';
import { filterEvents } from '../../components/eventOverview/utility/eventFilteringHelper';
import { isClientSide } from '../../utilities/contextHelper';

type ReduxSuppliedProps = {
    events: EventOverviewItem[];
};

type OwnProps = {};

type CombinedProps = OwnProps & ReduxSuppliedProps & DispatchProp;

const EventsOverview: NextComponentType<
    ExtendedNextContext,
    ReduxSuppliedProps,
    CombinedProps
> = ({ events }) => {
    const [currentGenre, setCurrentGenre] = useState<string | null>(null);
    const [currentQuery, setCurrentQuery] = useState<string | null>(null);

    const onGenreChangeCallback = useCallback(
        (genre: string | null) => setCurrentGenre(genre),
        []
    );

    const onQueryChangeCallback = useCallback(
        (query: string | null) => setCurrentQuery(query),
        []
    );

    const filteredEvents = filterEvents(events, currentGenre, currentQuery);

    return (
        <div>
            <Head title="Events" />
            <h1>Event overview</h1>
            <EventOverviewFiltering
                events={events}
                onGenreChange={onGenreChangeCallback}
                onQueryChange={onQueryChangeCallback}
                currentGenre={currentGenre}
                currentQuery={currentQuery}
            />
            <EventList>
                <h3>{filteredEvents.length} events found</h3>
                {filteredEvents.map(event => (
                    <EventListItem data={event} key={event.id} />
                ))}
            </EventList>
        </div>
    );
};

function dispatchFetchAction(store: Store) {
    // @ts-ignore -> typescript does not know we can dispatch thunk actions
    return store.dispatch(createFetchEventsAction());
}

EventsOverview.getInitialProps = async function({ store }) {
    const { events: preFetchedEvents } = store.getState();

    if (Array.isArray(preFetchedEvents)) {
        // The store already contains event data, return that right away. We however
        // still want to dispatch the action to get any new events that might exist
        // on the server but are not here yet. But we don't want to await that request
        // because we already have something to display.
        if (isClientSide) {
            dispatchFetchAction(store);
        }

        return { events: preFetchedEvents };
    }

    await dispatchFetchAction(store);

    const justFetchedEvents = store.getState().events;

    return {
        events: justFetchedEvents || [],
    };
};

const mapGlobalStateToProps = ({ events }: GlobalState) => ({
    events: events || [],
});

const withGlobalStateAccess = connect<
    ReduxSuppliedProps,
    {},
    OwnProps,
    GlobalState
>(mapGlobalStateToProps);

export default withGlobalStateAccess(EventsOverview);
