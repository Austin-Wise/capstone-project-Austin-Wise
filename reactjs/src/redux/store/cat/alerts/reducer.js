import { ADD_ALERT, REMOVE_ALERT } from '../../actionTypes';

const initialState = [];
let id = 0;

const addAlert = (state, alert) => {
  if (!alert.text) return state;
  id += 1;
  return [
    ...state,
    {
      id,
      text: alert.text,
      type: alert.type || 'warning',
    },
  ];
};

const removeAlert = (state, alertId) => {
  return state.filter(alert => alert.id !== alertId);
};

export default function reducer(state = initialState, action) {
  if (action.type.indexOf('_ERROR') > -1) {
    return addAlert(state, {
      text: action.err.message,
      type: 'danger',
    });
  }
  if (
    (action.type.indexOf('UPDATE_') > -1 || action.type.indexOf('ADD_') > -1) &&
    action.type.indexOf('_SUCCESS') > -1
  ) {
    return addAlert(state, {
      text: 'Save Successful',
      type: 'success',
    });
  }
  if (action.type === ADD_ALERT) {
    return addAlert(state, action.payload);
  }
  if (action.type === REMOVE_ALERT) {
    return removeAlert(state, action.payload);
  }
  return state;
}
