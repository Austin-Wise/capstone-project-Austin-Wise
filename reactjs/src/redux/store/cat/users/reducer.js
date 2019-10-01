import createReducer from '../../helpers/createReducer';

import {
  ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  REQ_USER_PENDING,
  REQ_USER_SUCCESS,
  REQ_USER_ERROR,
} from '../../actionTypes';

const initialState = {
  // will hold each user with ids as keys
  byId: {},
  // an array of all the ids
  allIds: [],
  // needed for cache state
  loadedAt: 0,
  // tracking if the state is loading
  isLoading: false,
  // any errors loading all the data
  error: null,
};

function userPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        ...state.byId[action.payload.id],
        isLoading: true,
        error: null,
      },
    },
  };
}

function userSuccess(state, action) {
  // clear loading and error, update cache time, add users
  // under data, grab id from payload instead of data.. endpoint id vs frontend generated id messes this up.
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        isLoading: false,
        error: null,
        loadedAt: Date.now(),
        data: {
          ...action.data,
          id: action.payload.id,
        },
      },
    },
    allIds: [...new Set([...state.allIds, action.payload.id])],
  };
}

function userError(state, action) {
  // clear loading and set error
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        ...state.byId[action.payload.id],
        isLoading: false,
        error: action.err,
      },
    },
  };
}
export default createReducer(initialState, {
  [ADD_USER_PENDING]: userPending,
  [ADD_USER_SUCCESS]: userSuccess,
  [ADD_USER_ERROR]: userError,
  [REQ_USER_PENDING]: userPending,
  [REQ_USER_SUCCESS]: userSuccess,
  [REQ_USER_ERROR]: userError,
});
