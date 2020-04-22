import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_TYPE_SELECT_SUCCESS,
  USER_TYPE_RESET_SUCCESS,
  FIRST_LOGIN,
  PRIVATE_KEY_DOWNLOADED,
  OPT_OUT_LOG,
} from '../actions/types';

// fetch JWT token and user object from localStorage as the initial state
// isAuthenticated initially is set to false
const initialState = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user'),
  isAuthenticated: false,
  isLoading: false,
  isUserTypeSelected: false,
  isSelectedRegularUser: null,
};

/**
 * handle authentication related redux actions
 * @param {*} state
 * @param {*} action
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // when either login or register successed, save token and user to localStorage
      localStorage.setItem('token', action.payload.accessToken);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        ...action.payload,
        token: action.payload.accessToken,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      // when error occured or logout was requested, delete token and user from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case USER_TYPE_SELECT_SUCCESS:
      return {
        ...state,
        isUserTypeSelected: true,
        isSelectedRegularUser: action.payload.isSelectedRegularUser,
      };
    case USER_TYPE_RESET_SUCCESS:
      return {
        ...state,
        isUserTypeSelected: false,
      };
    case OPT_OUT_LOG:
      return {
        ...state,
        user: {
          ...state.user,
          hasEncryptionKeys: true,
        },
      };
    default:
      return state;
  }
}
