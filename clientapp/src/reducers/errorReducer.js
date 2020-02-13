import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

// the error state has a error message, a http status and an id for the error
// initially there is no error
const initialState = {
  msg: null,
  status: null,
  id: null
};

/**
 * errorReducer for dispatching error related actions
 * @param {*} state
 * @param {*} action
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return {
        msg: null,
        status: null,
        id: null
      };
    default:
      return state;
  }
}
