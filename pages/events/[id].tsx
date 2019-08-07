import { NextComponentType } from 'next';
import { withRouter, Router } from 'next/router';
import { EventOverviewItem } from '../../api/response/types';
import { DispatchProp, Store } from '../../globalState/types';
import { ExtendedNextContext } from '../../hoc/withReduxStore';
import { createFetchEventsAction } from '../../globalState/action/factory/eventsActionFactory';
import { isClientSide } from '../../utilities/contextHelper';
import Head from '../../components/meta/head';
import { eventOverview as eventOverviewRoute } from '../../routing/urlGenerator';

type ReduxSuppliedProps = {
    event?: EventOverviewItem;
};

type OwnProps = {};

type CombinedProps = OwnProps &
    ReduxSuppliedProps &
    DispatchProp & {
        router: Router;
    };

const Event: NextComponentType<
    ExtendedNextContext,
    ReduxSuppliedProps,
    CombinedProps
> = ({ event, router }) => {
    if (isClientSide && !event) {
        router.push(eventOverviewRoute.path);
    }

    return (
        <div>
            <Head title={event ? `${event.title} - Events` : 'Events'} />
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

Event.getInitialProps = async function({ query, store, res: response }) {
    if (typeof query.id !== 'string') {
        throw new Error('Expecting id parameter in query to be of type string');
    }

    const id = parseInt(query.id, 10);

    const { events: preFetchedEvents } = store.getState();

    if (Array.isArray(preFetchedEvents)) {
        const event = preFetchedEvents.find(
            cursorEvent => cursorEvent.id === id
        );

        if (!event && response) {
            response.statusCode = 404;
        }

        // The store already contains event data, return that right away. We however
        // still want to dispatch the action to get any new events that might exist
        // on the server but are not here yet. But we don't want to await that request
        // because we already have something to display.
        if (isClientSide) {
            dispatchFetchAction(store);
        }

        return { event };
    }

    await dispatchFetchAction(store);

    const justFetchedEvents = store.getState().events;

    if (Array.isArray(justFetchedEvents)) {
        const event = justFetchedEvents.find(
            cursorEvent => cursorEvent.id === id
        );

        if (!event && response) {
            response.statusCode = 404;
        }

        return { event };
    }

    return {};
};

export default withRouter(Event);
