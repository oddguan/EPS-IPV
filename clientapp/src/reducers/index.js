import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import todoReducer from './todoReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  todo: todoReducer
});
