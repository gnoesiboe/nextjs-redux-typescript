import { applyMiddleware, StoreEnhancer, Middleware } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { GlobalState, RootAction } from '../types';

export function createMiddlewareChain(): StoreEnhancer {
    const middlewares: Middleware[] = [
        thunkMiddleware as ThunkMiddleware<GlobalState, RootAction>,
    ];

    return composeWithDevTools(applyMiddleware(...middlewares));
}
