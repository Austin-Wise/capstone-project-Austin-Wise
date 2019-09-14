/* eslint-disable import/prefer-default-export */
import API from '../../../../API';

import {
  REQ_COMPANYDATA_PENDING,
  REQ_COMPANYDATA_SUCCESS,
  REQ_COMPANYDATA_ERROR,
  DELETE_COMPANYDATA_PENDING,
  DELETE_COMPANYDATA_SUCCESS,
  DELETE_COMPANYDATA_ERROR
} from '../../actionTypes';

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

export const fetchCompanyData = id => ({
  types: [
    REQ_COMPANYDATA_PENDING,
    REQ_COMPANYDATA_SUCCESS,
    REQ_COMPANYDATA_ERROR
  ],
  callAPI: () => API.get(`/companyData/${id}`),
  shouldCallAPI: state => {
    const companyData = state.companyData.byId[id] || {};
    const { loadedAt, isLoading } = companyData;
    if (!companyData || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

export const deleteCompanyData = id => ({
  types: [
    DELETE_COMPANYDATA_PENDING,
    DELETE_COMPANYDATA_SUCCESS,
    DELETE_COMPANYDATA_ERROR
  ],
  callAPI: () => API.delete(`/companyDatas/${id}`),
  payload: { id }
});
