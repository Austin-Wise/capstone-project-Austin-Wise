import createReducer from '../../helpers/createReducer';

import {
  REQ_COMPANYDATA_PENDING,
  REQ_COMPANYDATA_SUCCESS,
  REQ_COMPANYDATA_ERROR,
  DELETE_COMPANYDATA_PENDING,
  DELETE_COMPANYDATA_SUCCESS,
  DELETE_COMPANYDATA_ERROR
} from '../../actionTypes';

const initialState = {
  // will hold each companyData with ids as keys
  byId: {},
  // an array of all the ids
  allIds: [],
  // needed for cache state
  loadedAt: 0,
  // tracking if the state is loading
  isLoading: false,
  // any errors loading all the data
  error: null
};

function companyDataPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        ...state.byId[action.payload.id],
        isLoading: true,
        error: null
      }
    }
  };
}

function companyDataSuccess(state, action) {
  // clear loading and error, update cache time, add companyDatas
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        isLoading: false,
        error: null,
        loadedAt: Date.now(),
        data: action.data
      }
    },
    allIds: [...new Set([...state.allIds, action.payload.id])]
  };
}

function companyDataError(state, action) {
  // clear loading and set error
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        ...state.byId[action.payload.id],
        isLoading: false,
        error: action.err
      }
    }
  };
}

function deleteCompanyDataSuccess(state, action) {
  // clear loading and error, update cache time, add companyData
  const {
    [action.payload.id]: deletedCompanyData,
    ...withoutCompanyData
  } = state.byId;
  return {
    ...state,
    byId: withoutCompanyData,
    allIds: state.allIds.filter(id => id !== action.payload.id)
  };
}

export default createReducer(initialState, {
  [REQ_COMPANYDATA_PENDING]: companyDataPending,
  [REQ_COMPANYDATA_SUCCESS]: companyDataSuccess,
  [REQ_COMPANYDATA_ERROR]: companyDataError,
  [DELETE_COMPANYDATA_PENDING]: companyDataPending,
  [DELETE_COMPANYDATA_SUCCESS]: deleteCompanyDataSuccess,
  [DELETE_COMPANYDATA_ERROR]: companyDataError
});
