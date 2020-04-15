import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { push } from 'connected-react-router';
import { authTokenConfig } from './authActions';
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
} from './types';

export const addNewPost = (title, content) => (dispatch, getState) => {
  dispatch({ type: ADD_NEW_POST_LOADING });
  const body = {
    title,
    content,
  };
  axios
    .post('api/post/', body, authTokenConfig(getState))
    .then((res) => {
      dispatch({ type: ADD_NEW_POST_SUCCESS, payload: res.data });
      dispatch(push('/education'));
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: ADD_NEW_POST_FAIL });
    });
};

export const fetchPosts = () => (dispatch, getState) => {
  dispatch({ type: FETCH_POSTS_LOADING });
  axios
    .get('api/post/', authTokenConfig(getState))
    .then((res) => {
      const postContents = camelcaseKeys(res.data, { deep: true });
      postContents.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      console.log(postContents);
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: postContents });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: FETCH_POSTS_FAIL });
    });
};

export const fetchSinglePost = (postId) => (dispatch, getState) => {
  dispatch({ type: FETCH_SINGLE_POST_LOADING });
  axios
    .get(`api/post/${postId}/`, authTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: FETCH_SINGLE_POST_SUCCESS,
        payload: camelcaseKeys(res.data),
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: FETCH_SINGLE_POST_FAIL });
    });
};
