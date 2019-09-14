/* eslint-disable import/prefer-default-export */
import uuid from 'uuid/v4';
import API from '../../../../API';

import {
  ADD_TICKER_PENDING,
  ADD_TICKER_SUCCESS,
  ADD_TICKER_ERROR,
  REQ_TICKER_PENDING,
  REQ_TICKER_SUCCESS,
  REQ_TICKER_ERROR,
  REQ_TICKERS_PENDING,
  REQ_TICKERS_SUCCESS,
  REQ_TICKERS_ERROR,
  DELETE_TICKER_PENDING,
  DELETE_TICKER_SUCCESS,
  DELETE_TICKER_ERROR
} from '../../actionTypes';

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

export const createTicker = ticker => {
  // create a uuid for this ticker so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_TICKER_PENDING, ADD_TICKER_SUCCESS, ADD_TICKER_ERROR],
    callAPI: () => API.post('/tickers', { ...ticker, id }),
    payload: { id }
  };
};

export const fetchTicker = id => ({
  types: [REQ_TICKER_PENDING, REQ_TICKER_SUCCESS, REQ_TICKER_ERROR],
  callAPI: () => API.get(`/tickers/${id}`),
  shouldCallAPI: state => {
    const ticker = state.tickers.byId[id] || {};
    const { loadedAt, isLoading } = ticker;
    if (!ticker || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

export const fetchTickers = () => ({
  // types for this action - "request, success, error"
  types: [REQ_TICKERS_PENDING, REQ_TICKERS_SUCCESS, REQ_TICKERS_ERROR],
  //  a function used to call the api
  callAPI: () => API.get('/tickers'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.tickers;
    // if ticker items are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have the ticker item or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export const deleteTicker = id => ({
  types: [DELETE_TICKER_PENDING, DELETE_TICKER_SUCCESS, DELETE_TICKER_ERROR],
  callAPI: () => API.delete(`/tickers/${id}`),
  payload: { id }
});
