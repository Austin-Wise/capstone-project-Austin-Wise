/* eslint-disable import/prefer-default-export */
import uuid from 'uuid/v4';
import API from '../../../../API';

import {
  ADD_BLOCK_PENDING,
  ADD_BLOCK_SUCCESS,
  ADD_BLOCK_ERROR,
  REQ_BLOCK_PENDING,
  REQ_BLOCK_SUCCESS,
  REQ_BLOCK_ERROR,
  REQ_BLOCKS_PENDING,
  REQ_BLOCKS_SUCCESS,
  REQ_BLOCKS_ERROR,
  DELETE_BLOCK_PENDING,
  DELETE_BLOCK_SUCCESS,
  DELETE_BLOCK_ERROR
} from '../../actionTypes';

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

export const createBlock = block => {
  // create a uuid for this block so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_BLOCK_PENDING, ADD_BLOCK_SUCCESS, ADD_BLOCK_ERROR],
    callAPI: () => API.post('/blocks', { ...block, id }),
    payload: { id }
  };
};

export const fetchBlock = id => ({
  types: [REQ_BLOCK_PENDING, REQ_BLOCK_SUCCESS, REQ_BLOCK_ERROR],
  callAPI: () => API.get(`/blocks/${id}`),
  shouldCallAPI: state => {
    const block = state.blocks.byId[id] || {};
    const { loadedAt, isLoading } = block;
    if (!block || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

export const fetchBlocks = () => ({
  // types for this action - "request, success, error"
  types: [REQ_BLOCKS_PENDING, REQ_BLOCKS_SUCCESS, REQ_BLOCKS_ERROR],
  //  a function used to call the api
  callAPI: () => API.get('/blocks'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.blocks;
    // if block items are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have the blocked item or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export const deleteBlock = id => ({
  types: [DELETE_BLOCK_PENDING, DELETE_BLOCK_SUCCESS, DELETE_BLOCK_ERROR],
  callAPI: () => API.delete(`/blocks/${id}`),
  payload: { id }
});
