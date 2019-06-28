import { ThunkAction } from '../../types';
import { apiEventOverviewPath } from '../../../api/urlGenerator';
import { executeGetRequest } from '../../../api/client';
import {
    EventOverviewResponse,
    EventOverviewItem,
} from '../../../api/response/types';
import { createAction } from 'typesafe-actions';

export const createFetchEventsSuccessAction = createAction(
    '@events/fetch/success',
    resolve => (events: EventOverviewResponse) => resolve({ events })
);

export function createFetchEventsAction(): ThunkAction<
    Promise<EventOverviewItem[]>
> {
    return async dispatch => {
        try {
            const response = await executeGetRequest<EventOverviewResponse>(
                apiEventOverviewPath
            );

            const events = response.data;

            dispatch(createFetchEventsSuccessAction(events));

            return events;
        } catch (error) {
            // @todo log error of some sorts

            return [];
        }
    };
}
