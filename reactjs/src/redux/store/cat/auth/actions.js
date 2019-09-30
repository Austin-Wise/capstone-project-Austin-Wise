import jwtDecode from 'jwt-decode';
import API from '../../../../API';
import {
  LOGIN_PENDING,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  FORGOT_PENDING,
  FORGOT_ERROR,
  FORGOT_SUCCESS,
  LOGOUT,
} from '../../actionTypes';

export const login = credentials => {
  return {
    types: [LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR],
    callAPI: () => API.post('/auth/login', credentials),
  };
};

export const signUp = credentials => {
  return {
    types: [LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR],
    callAPI: () => API.post('/auth', credentials),
  };
};

export const logout = () => {
  delete localStorage.authToken;

  return { type: LOGOUT };
};

export const forgotPassword = credentials => ({
  types: [FORGOT_PENDING, FORGOT_ERROR, FORGOT_SUCCESS],
  callAPI: () => API.post('/auth/forgot', credentials),
});

export const resetPassword = credentials => ({
  types: [LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR],
  callAPI: () => API.put('/auth/reset', credentials),
});
