import { Dispatch } from 'react';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducer/rootReducer';
import rootSaga from '../sagas';

window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = compose;

const localStorageMiddleware = (store) => {
    return (next) => (action) => {
        const result = next(action);
        try {
            const { settings } = store.getState();
            localStorage.setItem('foodie_theme', JSON.stringify(settings.theme));
        } catch (e) {
            console.log('Error while saving in localStorage', e);
        }
        return result;
    };
};

const reHydrateStore = () => {
    const storage = localStorage.getItem('foodie_theme');
    if (storage && storage !== null) {
        return {
            settings: {
                theme: JSON.parse(storage)
            }
        };
    }
    return undefined;
};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, localStorageMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
}

const configureStore = () => {
    const store = createStore(
        rootReducer,
        reHydrateStore(),
        composeEnhancers(applyMiddleware(...middlewares)),
    );

    sagaMiddleware.run(rootSaga);
    return store;
};

const store = configureStore();

export default store;
