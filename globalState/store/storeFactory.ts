import { createStore as createReduxStore } from 'redux';
import { GlobalState, RootAction, Store, InitialGlobalState } from './../types';
import { createRootReducer } from '../reducers/rootReducerFactory';
import { createMiddlewareChain } from '../middleware/middlewareChainFactory';

export function createStore(initialState: InitialGlobalState = {}): Store {
    const rootReducer = createRootReducer();

    return createReduxStore<GlobalState, RootAction, {}, {}>(
        rootReducer,
        initialState,
        createMiddlewareChain()
    );
}
