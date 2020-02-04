import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import errorReducer from './errorReducer';
import authReducer from './authReducer';
import todoReducer from './todoReducer';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    error: errorReducer,
    todo: todoReducer
  });

export default createRootReducer;
