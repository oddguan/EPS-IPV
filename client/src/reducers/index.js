import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import errorReducer from './errorReducer';
import authReducer from './authReducer';
import todoReducer from './todoReducer';

/**
 * The root reducer creation function.
 * Combines all reducer defined and add react-router support as well
 * @param {*} history
 */
const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    error: errorReducer,
    todo: todoReducer
  });

export default createRootReducer;
