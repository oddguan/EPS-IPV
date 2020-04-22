import {
  // ADD_NEW_LOG_SUCCESS,
  // ADD_NEW_LOG_FAIL,
  RETRIEVE_ALL_PROCCESSING_REQUESTS_SUCCESS,
  RETRIEVE_ALL_PROCCESSING_REQUESTS_FAIL,
} from '../actions/types';

const initialState = {
  allProcessingRequests: [],
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
    default:
      return { ...state };
  }
};
