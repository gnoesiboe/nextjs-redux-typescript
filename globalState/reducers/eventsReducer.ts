import { EventOverviewItem } from '../../api/response/types';
import { ActionType, getType } from 'typesafe-actions';
import * as actionFactories from '../action/factory/eventsActionFactory';
import { RootAction } from '../types';

export type EventsAction = ActionType<typeof actionFactories>;

export type State = EventOverviewItem[] | null;

const DEFAULT_STATE: State = null;

const eventsReducer = (
    currentState: State = DEFAULT_STATE,
    action: RootAction
) => {
    switch (action.type) {
        case getType(actionFactories.createFetchEventsSuccessAction):
            return action.payload.events;

        default:
            return currentState;
    }
};

export default eventsReducer;
