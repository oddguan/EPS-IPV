import {
  ADD_NEW_POST_LOADING,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_FAIL,
} from '../actions/types';

const initialState = {
  postIds: [],
  isAddingPost: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_POST_LOADING:
      return {
        ...state,
        isAddingPost: true,
      };
    case ADD_NEW_POST_SUCCESS:
      return {
        ...state,
        isAddingPost: false,
        postIds: action.payload,
      };
    case ADD_NEW_POST_FAIL:
      return {
        ...state,
        isAddingPost: false,
      };
    default:
      return {
        ...state,
      };
  }
}
