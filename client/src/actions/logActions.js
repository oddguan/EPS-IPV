import axios from 'axios';
import { ADD_NEW_LOG_SUCCESS, ADD_NEW_LOG_FAIL } from './types';
import { authTokenConfig } from './authActions';

export const uploadNewLog = (isSelectText, content) => (dispatch, getState) => {
  const form = new FormData();
  form.append('title', content.title);
  let url = 'api/log/';
  if (isSelectText) {
    url += 'text/';
    form.append('content', content.content);
  } else {
    url += 'image/';
    form.append('image', content.selectedFile);
  }

  const config = authTokenConfig(getState);
  config.headers = { ...config.headers, 'Content-type': 'multipart/form-data' };
  axios
    .put(url, form, config)
    .then((res) => {
      if (res.status !== 201) {
        throw new Error('log upload error');
      }
      dispatch({ type: ADD_NEW_LOG_SUCCESS });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: ADD_NEW_LOG_FAIL });
    });
};
