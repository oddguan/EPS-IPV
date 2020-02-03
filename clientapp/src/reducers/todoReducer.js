import {
  GET_TODOS,
  ADD_TODO,
  COMPLETE_TODO,
  EDIT_TODO,
  REMOVE_TODO,
  TODO_FAIL
} from '../actions/types';

const initialState = {
  todos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    case ADD_TODO:
    case COMPLETE_TODO:
    case EDIT_TODO:
    case REMOVE_TODO:
      return {
        ...state,
        todos: action.payload
      };
    case TODO_FAIL:
      return {
        ...state,
        todos: []
      };
    default:
      return state;
  }
}
