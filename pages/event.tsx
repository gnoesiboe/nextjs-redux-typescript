import { NextFunctionComponent } from 'next';
import { withRouter, DefaultQuery } from 'next/router';
import { EventOverviewItem } from '../api/response/types';
import { DispatchProp, Store } from '../globalState/types';
import { ExtendedNextContext } from '../hoc/withReduxStore';
import { createFetchEventsAction } from '../globalState/action/factory/eventsActionFactory';

type ReduxSuppliedProps = {
    event?: EventOverviewItem;
};

type OwnProps = {};

type CombinedProps = OwnProps & ReduxSuppliedProps & DispatchProp;

interface Query extends DefaultQuery {
    id: string;
}

const Event: NextFunctionComponent<
    CombinedProps,
    ReduxSuppliedProps,
    ExtendedNextContext<Query>
> = ({ event }) => {
    if (!event) {
        // @todo 404 response?

        return null;
    }

    return (
        <div>
            {event && (
                <>
                    <h1>{event.title}</h1>
                    {event.images.map((src, index) => (
                        <img src={src} key={index} />
                    ))}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: event.description || '',
                        }}
                    />
                    <a href={event.url} target="_blank">
                        Ga naar website
                    </a>
                </>
            )}
        </div>
    );
};

function dispatchFetchAction(store: Store) {
    // @ts-ignore -> typescript does not know we can dispatch thunk actions
    return store.dispatch(createFetchEventsAction());
}

Event.getInitialProps = async function({ query, store }) {
    const id = parseInt(query.id, 10);

    const { events: preFetchedEvents } = store.getState();

    if (Array.isArray(preFetchedEvents)) {
        const event = preFetchedEvents.find(
            cursorEvent => cursorEvent.id === id
        );

        // The store already contains event data, return that right away. We however
        // still want to dispatch the action to get any new events that might exist
        // on the server but are not here yet. But we don't want to await that request
        // because we already have something to display.
        dispatchFetchAction(store);

        return { event };
    }

    await dispatchFetchAction(store);

    const justFetchedEvents = store.getState().events;

    return {
        events: justFetchedEvents,
    };
};

export default withRouter(Event);
