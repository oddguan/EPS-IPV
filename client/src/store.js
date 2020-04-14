import { createStore, applyMiddleware, compose } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

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
const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
