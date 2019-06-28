import { combineReducers, Reducer } from 'redux';
import { GlobalState, RootAction } from '../types';
import eventsReducer from './eventsReducer';

export function createRootReducer(): Reducer<GlobalState, RootAction> {
    return combineReducers<GlobalState, RootAction>({
        events: eventsReducer,
    });
}
