import {
  ADD_NEW_POST_LOADING,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_FAIL,
  FETCH_POSTS_LOADING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_SINGLE_POST_LOADING,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAIL,
} from '../actions/types';

const initialState = {
  postIds: [],
  postContents: [],
  isAddingPost: false,
  isFetchingPosts: false,
  isFetchingSinglePost: false,
  post: {},
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
    case FETCH_POSTS_LOADING:
      return {
        ...state,
        isFetchingPosts: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetchingPosts: false,
        postContents: action.payload,
      };
    case FETCH_POSTS_FAIL:
      return {
        ...state,
        isFetchingPosts: false,
        postContents: [],
      };
    case FETCH_SINGLE_POST_LOADING:
      return {
        ...state,
        isFetchingSinglePost: true,
      };
    case FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        isFetchingSinglePost: false,
        post: action.payload,
      };
    case FETCH_SINGLE_POST_FAIL:
      return {
        ...state,
        isFetchingSinglePost: false,
      };
    default:
      return {
        ...state,
      };
  }
}
