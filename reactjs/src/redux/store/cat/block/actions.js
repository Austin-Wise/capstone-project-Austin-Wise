import API from '../../../../API';

import {
  REQ_BLOCK_PENDING,
  REQ_BLOCK_SUCCESS,
  REQ_BLOCK_ERROR
} from '../../actionTypes';

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

const fetchBlock = () => ({
  // types for this action - "request, success, error"
  types: [REQ_BLOCK_PENDING, REQ_BLOCK_SUCCESS, REQ_BLOCK_ERROR]
    //  a function used to call the api
  callAPI: () => API.get('/items'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.items;
    // if items are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have the item or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export default fetchBlock;
