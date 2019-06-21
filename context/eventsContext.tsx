import { createContext, useContext } from 'react';
import { EventOverviewResponse } from '../api/response/types';

type EventsContextType = {
    events: EventOverviewResponse;
};

const defaultContextValue: EventsContextType = {
    events: [],
};

const EventsContext = createContext<EventsContextType>(defaultContextValue);

export const { Consumer, Provider } = EventsContext;

export const useEventsContext = () => {
    const { events } = useContext(EventsContext);

    return { events };
};
