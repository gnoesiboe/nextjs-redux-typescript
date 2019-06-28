import React from 'react';
import { createStore } from '../globalState/store/storeFactory';
import { Store, InitialGlobalState } from '../globalState/types';
import { NextComponentClass, NextContext } from 'next';
import { isServer } from '../utilities/contextHelper';
import { DefaultQuery } from 'next/router';

const STORE_WINDOW_CACHE_NAMESPACE: string = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState: InitialGlobalState = {}): Store {
    if (isServer) {
        // Always make a new store if server, otherwise state is shared between requests
        return createStore(initialState);
    }

    // Create store if unavailable on the client and set it on the window object
    // @ts-ignore
    if (!window[STORE_WINDOW_CACHE_NAMESPACE]) {
        // @ts-ignore
        window[STORE_WINDOW_CACHE_NAMESPACE] = createStore(initialState);
    }

    // @ts-ignore
    return window[STORE_WINDOW_CACHE_NAMESPACE];
}

type Props = { store: Store; initialReduxState: InitialGlobalState };

export interface ExtendedNextContext<Q extends DefaultQuery = DefaultQuery>
    extends NextContext<Q> {
    store: Store;
}

const withStore = (Component: NextComponentClass<Props>) => {
    return class AppWithRedux extends React.Component<Props> {
        private store: Store;

        static async getInitialProps(appContext: any) {
            // Get or Create the store with `undefined` as initialState
            // This allows you to set a custom default initialState
            const store = getOrCreateStore();

            // Provide the store to getInitialProps of pages
            appContext.ctx.store = store;

            let appProps = {};

            if (typeof Component.getInitialProps === 'function') {
                appProps = await Component.getInitialProps(appContext);
            }

            return {
                ...appProps,
                initialReduxState: store.getState(),
            };
        }

        constructor(props: Props) {
            super(props);

            this.store = getOrCreateStore(props.initialReduxState);
        }

        render() {
            // @ts-ignore -> don't know how to fix this right now
            return <Component {...this.props} store={this.store} />;
        }
    };
};

export default withStore;
