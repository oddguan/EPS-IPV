import axios from 'axios';
import snakeCaseKeys from 'snakecase-keys';
import camelCaseKeys from 'camelcase-keys';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USER_TYPE_SELECT_SUCCESS,
} from './types';
import { returnErrors } from './errorActions';
import { push } from 'connected-react-router';

/**
 * fetch user details by userId
 */
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // get request to '/api/auth/user'
  axios
    .get('/api/auth/user', authTokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: camelCaseKeys(res.data, { deep: true }),
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

/**
 * A general action for registering regular users (victims)
 */
export const registerRegularUser = ({
  firstName,
  lastName,
  username,
  password,
  email,
  phonenumber,
  hint,
}) => (dispatch) => {
  // everything will be posted using json format
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  let body = {
    firstName,
    lastName,
    username,
    password,
  };

  if (email) {
    body.email = email;
  }
  if (phonenumber) {
    body.phonenumber = phonenumber;
  }
  if (hint) {
    body.hint = hint;
  }

  body = JSON.stringify(snakeCaseKeys(body));

  // post the registration details to the backend
  axios
    .post('/api/auth/register/victim', body, config)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Unknown Database Error');
      }
      dispatch({
        type: REGISTER_SUCCESS,
        payload: camelCaseKeys(res.data, { deep: true }),
      });
      // redirect user to the home page after successful registration
      dispatch(push('/'));
    })
    .catch((err) => {
      if (err instanceof Error) {
        returnErrors(err.message, 500, 'REGISTER_FAIL');
      }
      dispatch(
        returnErrors(
          err.response.data.message,
          err.response.status,
          'REGISTER_FAIL'
        )
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

/**
 * an action for registering help providers
 */
export const registerHelpProvider = ({
  firstName,
  lastName,
  username,
  password,
  email,
  organization,
  phonenumber,
  hint,
}) => (dispatch) => {
  // everything will be posted using json format
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  let body = {
    firstName,
    lastName,
    username,
    organization,
    email,
    password,
  };
  if (phonenumber) {
    body.phonenumber = phonenumber;
  }
  if (hint) {
    body.hint = hint;
  }

  body = JSON.stringify(snakeCaseKeys(body));

  // post the registration details to the backend
  axios
    .post('/api/auth/register/provider', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: camelCaseKeys(res.data, { deep: true }),
      });
      // redirect user to the home page after successful registration
      dispatch(push('/'));
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.message,
          err.response.status,
          'REGISTER_FAIL'
        )
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

/**
 * the login action, which logs user in, stores returned JWT token and user detail into localStorage
 * @param { email, password } param0
 */
export const login = ({ username, password }) => (dispatch) => {
  // Common Headers, submitting everything as json
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // The login body, "loginRequest" in the backend
  const body = JSON.stringify({
    username,
    password,
  });

  // submit a post request to '/api/auth/login'
  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: camelCaseKeys(res.data, { deep: true }),
      });
      // return the res promise in case any other place needs it
      dispatch(push('/'));
      return res;
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.message,
          err.response.status,
          'LOGIN_FAIL'
        )
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

/**
 * the logout action, which essentially deletes everything in the localStorage and set
 * the "isAuthenticated" status to false
 */
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const setRegularUserStatus = (isSelectedRegularUser) => ({
  type: USER_TYPE_SELECT_SUCCESS,
  payload: {
    isSelectedRegularUser,
  },
});

/**
 * A common utility function for setting the authentication header
 * Since each requests other than login and register needs authentication,
 * this function sets the "Authorization" header to the JWT value stored in
 * the auth state
 * @param {*} getState
 */
export const authTokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If jwt token presented, add to headers
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};
