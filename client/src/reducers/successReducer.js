import { GET_SUCCESS, CLEAR_SUCCESS } from '../actions/types';

const initialState = {
  msg: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESS:
      return {
        msg: action.payload.msg,
      };
    case CLEAR_SUCCESS:
      return {
        msg: null,
      };
    default:
      return state;
  }
}
