import { EventOverviewItem } from '../../../api/response/types';
import { throttle } from 'lodash';

const checkEventMatchesGenre = (
    event: EventOverviewItem,
    genre: string
): boolean => event.genre === genre;

const checkEventMatchesQuery = (
    event: EventOverviewItem,
    query: string
): boolean => {
    const regex = new RegExp(query, 'gi');
    const valuesToCheck = [event.title, event.performer];

    for (
        let currentIndex = 0, noOfValues = valuesToCheck.length;
        currentIndex < noOfValues;
        currentIndex++
    ) {
        const value = valuesToCheck[currentIndex];

        if (value && value.search(regex) !== -1) {
            return true;
        }
    }

    return false;
};

export const filterEvents = throttle(
    (
        allEvents: EventOverviewItem[],
        currentGenre: string | null,
        currentQuery: string | null
    ): EventOverviewItem[] => {
        let filteredEvents = allEvents;

        if (currentGenre) {
            filteredEvents = filteredEvents.filter(cursorEvent =>
                checkEventMatchesGenre(cursorEvent, currentGenre)
            );
        }

        if (currentQuery) {
            filteredEvents = filteredEvents.filter(cursorEvent =>
                checkEventMatchesQuery(cursorEvent, currentQuery)
            );
        }

        return filteredEvents;
    },
    500,
    {
        leading: true,
        trailing: true,
    }
);
