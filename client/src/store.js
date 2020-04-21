import { createStore, applyMiddleware, compose } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import createRootReducer from './reducers';

/**
 * This is the root file of the Redux store object.
 * It exports a the store object created by the reducers/index.js file.
 * It utilizes the "history" package for browser history and react router support.
 */

export const history = createHashHistory();

const initialState = {};

const middlewares = [thunk, routerMiddleware(history)];

// This is for enabling google redux extension
const composeEnhancers =
  (process.env.NODE_ENV === 'production'
    ? null
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = createRootReducer(history);
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default store;
