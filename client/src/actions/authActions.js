import axios from 'axios';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
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
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

/**
 * the registration action, which posts everything user entered to the backend and returns a
 * new login session and user detail registered in the database
 * @param { firstName, lastName, username, email, password } param0
 */
export const register = ({
  firstName,
  lastName,
  username,
  email,
  password
}) => dispatch => {
  // everything will be posted using json format
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({
    firstName,
    lastName,
    username,
    email,
    password
  });

  // post the registration details to the backend
  axios
    .post('/api/auth/register', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      // redirect user to the home page after successful registration
      dispatch(push('/'));
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data.message,
          err.response.status,
          'REGISTER_FAIL'
        )
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

/**
 * the login action, which logs user in, stores returned JWT token and user detail into localStorage
 * @param { email, password } param0
 */
export const login = ({ email, password }) => dispatch => {
  // Common Headers, submitting everything as json
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // };

  // The login body, "loginRequest" in the backend
  // const body = JSON.stringify({
  //   email,
  //   password
  // });

  // ******** For development purpose mock only
  // Mock the login process as the backend is not devloped yet
  setTimeout(() => {
    const payload = {
      accessToken: 'Bearer testtoken123',
      user: {
        id: 12345678,
        username: 'oddguan',
        role: 'ADMIN',
        firstName: 'Chenxiao',
        lastName: 'Guan',
        email: '1011zaozao@gmail.com'
      }
    };
    dispatch({
      type: LOGIN_SUCCESS,
      payload
    });
    dispatch(push('/'));
  }, 1500);

  // submit a post request to '/api/auth/login'
  // axios
  //   .post('/api/auth/login', body, config)
  //   .then(res => {
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: res.data
  //     });
  //     // return the res promise in case any other place needs it
  //     dispatch(push('/'));
  //     return res;
  //   })
  //   .catch(err => {
  //     dispatch(
  //       returnErrors(
  //         err.response.data.message,
  //         err.response.status,
  //         'LOGIN_FAIL'
  //       )
  //     );
  //     dispatch({
  //       type: LOGIN_FAIL
  //     });
  //   });
};

/**
 * the logout action, which essentially deletes everything in the localStorage and set
 * the "isAuthenticated" status to false
 */
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

/**
 * A common utility function for setting the authentication header
 * Since each requests other than login and register needs authentication,
 * this function sets the "Authorization" header to the JWT value stored in
 * the auth state
 * @param {*} getState
 */
export const authTokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If jwt token presented, add to headers
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};
