import axios from 'axios';
import fileDownload from 'js-file-download';
import {
  ADD_NEW_LOG_SUCCESS,
  ADD_NEW_LOG_FAIL,
  REQUEST_RETRIEVE_LOG_SUCCESS,
  REQUEST_RETRIEVE_LOG_FAIL,
  RETRIEVE_ALL_PROCCESSING_REQUESTS_FAIL,
  RETRIEVE_ALL_PROCCESSING_REQUESTS_SUCCESS,
  FETCH_SUBMITTED_LOGS_SUCCESS,
  FETCH_SUBMITTED_LOGS_FAIL,
} from './types';
import { authTokenConfig } from './authActions';
import camelcaseKeys from 'camelcase-keys';

/**
 * action for uploading a new log to the backend
 * will differentiate between text or image logs by a boolean value
 * @param {*} isSelectText
 * @param {*} content
 */
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

/**
 * retrieve a list of logs
 */
export const makeRetrieveLogRequest = () => (dispatch, getState) => {
  axios
    .get('/api/log/request/', authTokenConfig(getState))
    .then((res) => {
      dispatch({ type: REQUEST_RETRIEVE_LOG_SUCCESS });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: REQUEST_RETRIEVE_LOG_FAIL });
    });
};

/**
 * for the retrieve log page to use, to retrieve a list of requests
 * for retrieving logs from victims
 */
export const retrieveAllProcessingRequests = () => (dispatch, getState) => {
  axios
    .get('/api/log/request/all/', authTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: RETRIEVE_ALL_PROCCESSING_REQUESTS_SUCCESS,
        payload: camelcaseKeys(res.data, { deep: true }),
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: RETRIEVE_ALL_PROCCESSING_REQUESTS_FAIL });
    });
};

/**
 * Fetch the zip with all encrypted logs and trigger a download
 * @param {*} victim_username
 */
export const downloadEncryptedLogsForVictim = (victim_username) => (
  dispatch,
  getState
) => {
  const config = authTokenConfig(getState);
  config.responseType = 'blob';
  axios
    .get(`/api/log/request/download/${victim_username}/`, config)
    .then((res) => {
      fileDownload(res.data, `${victim_username}-logs.zip`, 'application/zip');
    })
    .then(() => {
      dispatch(retrieveAllProcessingRequests());
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * Fetch a list of submitted logs on the logs page
 */
export const fetchListOfSubmittedLogs = () => (dispatch, getState) => {
  axios
    .get('/api/log/', authTokenConfig(getState))
    .then((res) => {
      return camelcaseKeys(res.data, { deep: true });
    })
    .then((data) => {
      dispatch({ type: FETCH_SUBMITTED_LOGS_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: FETCH_SUBMITTED_LOGS_FAIL });
    });
};
