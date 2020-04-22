import { GET_SUCCESS, CLEAR_SUCCESS } from './types';

export const reuturnSuccessMessage = (msg) => {
  return {
    type: GET_SUCCESS,
    payload: {
      msg,
    },
  };
};

export const clearSuccessMessage = () => {
  return {
    type: CLEAR_SUCCESS,
  };
};
