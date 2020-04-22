import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import errorReducer from './errorReducer';
import authReducer from './authReducer';
import postReducer from './postReducer';
import logReducer from './logReducer';
import successReducer from './successReducer';

/**
 * The root reducer creation function.
 * Combines all reducer defined and add react-router support as well
 * @param {*} history
 */
const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    error: errorReducer,
    post: postReducer,
    log: logReducer,
    success: successReducer,
  });

export default createRootReducer;
