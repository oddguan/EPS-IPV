import {
  // ADD_NEW_LOG_SUCCESS,
  // ADD_NEW_LOG_FAIL,
  RETRIEVE_ALL_PROCCESSING_REQUESTS_SUCCESS,
  RETRIEVE_ALL_PROCCESSING_REQUESTS_FAIL,
  FETCH_SUBMITTED_LOGS_SUCCESS,
  FETCH_SUBMITTED_LOGS_FAIL,
} from '../actions/types';

const initialState = {
  allProcessingRequests: [],
  submittedLogs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_ALL_PROCCESSING_REQUESTS_SUCCESS:
      return {
        ...state,
        allProcessingRequests: action.payload,
      };
    case RETRIEVE_ALL_PROCCESSING_REQUESTS_FAIL:
      return {
        ...state,
        allProcessingRequests: [],
      };
    case FETCH_SUBMITTED_LOGS_SUCCESS:
      return {
        ...state,
        submittedLogs: action.payload,
      };
    case FETCH_SUBMITTED_LOGS_FAIL:
      return {
        ...state,
        submittedLogs: [],
      };
    default:
      return { ...state };
  }
};
