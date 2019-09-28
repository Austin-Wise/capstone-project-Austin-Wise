/* eslint-disable import/prefer-default-export */
import uuid from 'uuid/v4';
import API from '../../../../API';

import {
  ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  REQ_USER_PENDING,
  REQ_USER_SUCCESS,
  REQ_USER_ERROR,
} from '../../actionTypes';

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

export const createUser = user => {
  // create a uuid for this user so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_USER_PENDING, ADD_USER_SUCCESS, ADD_USER_ERROR],
    callAPI: () => API.post('/users', { ...user, id }),
    payload: { id },
  };
};

export const fetchUser = id => ({
  types: [REQ_USER_PENDING, REQ_USER_SUCCESS, REQ_USER_ERROR],
  callAPI: () => API.get(`/users/${id}`),
  shouldCallAPI: state => {
    const user = state.users.byId[id] || {};
    const { loadedAt, isLoading } = user;
    if (!user || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id },
});
