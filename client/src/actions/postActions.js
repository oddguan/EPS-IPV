import axios from 'axios';
import { push } from 'connected-react-router';
import { authTokenConfig } from './authActions';
import {
  ADD_NEW_POST_LOADING,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_FAIL,
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
      console.log(res.data);
      dispatch({ type: ADD_NEW_POST_SUCCESS, payload: res.data });
      dispatch(push('/education'));
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: ADD_NEW_POST_FAIL });
    });
};
