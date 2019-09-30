import { ADD_ALERT, REMOVE_ALERT } from '../../actionTypes';

export const createAlert = alert => {
  return {
    type: ADD_ALERT,
    payload: alert,
  };
};

export const clearAlert = id => {
  return {
    type: REMOVE_ALERT,
    payload: id,
  };
};
