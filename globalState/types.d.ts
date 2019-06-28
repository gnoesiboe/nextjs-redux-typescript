import { Action, AnyAction } from 'redux';
import { DispatchProp as ReduxDispatchProp } from 'react-redux';
import { ThunkAction as ReduxThunkAction } from 'redux-thunk';
import {
    EventsAction,
    State as EventsReducerState,
} from './reducers/eventsReducer';
import { Store as ReduxStore } from 'redux';

export type Store = ReduxStore<GlobalState, RootAction>;

export type GlobalState = {
    events: EventsReducerState;
};

export type InitialGlobalState = Partial<GlobalState>;

export type RootAction = EventsAction;

export type ThunkAction<Result> = ReduxThunkAction<
    Result,
    GlobalState,
    undefined,
    Action<string>
>;

export type DispatchProp = ReduxDispatchProp<RootAction>;
