import createReducer from '../../helpers/createReducer';

import {
  LOGIN_PENDING,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../../actionTypes';

const initialState = (token => ({
  isAuthenticating: false,
  loggedIn: !!token,
  errorMessage: null,
}))(localStorage.authToken);

function loginRequest(state, action) {
  return {
    ...state,
    isAuthenticating: true,
    loggedIn: false,
  };
}
function loginFailure(state, action) {
  return {
    ...state,
    isAuthenticating: false,
    loggedIn: false,
    errorMessage: action.errorMessage,
  };
}
function loginSuccess(state, action) {
  localStorage.authToken = action.data.token;
  return {
    isAuthenticating: false,
    loggedIn: true,
    errorMessage: null,
  };
}
function logout(state, action) {
  return {
    isAuthenticating: false,
    loggedIn: false,
    errorMessage: null,
  };
}

export default createReducer(initialState, {
  [LOGIN_PENDING]: loginRequest,
  [LOGIN_ERROR]: loginFailure,
  [LOGIN_SUCCESS]: loginSuccess,
  [LOGOUT]: logout,
});
