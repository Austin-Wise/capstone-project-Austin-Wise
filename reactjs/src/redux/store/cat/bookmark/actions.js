/* eslint-disable import/prefer-default-export */
import uuid from 'uuid/v4';
import API from '../../../../API';

import {
  ADD_BOOKMARK_PENDING,
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_ERROR,
  REQ_BOOKMARK_PENDING,
  REQ_BOOKMARK_SUCCESS,
  REQ_BOOKMARK_ERROR,
  REQ_BOOKMARKS_PENDING,
  REQ_BOOKMARKS_SUCCESS,
  REQ_BOOKMARKS_ERROR,
  DELETE_BOOKMARK_PENDING,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_ERROR
} from '../../actionTypes';

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

export const createBookmark = bookmark => {
  // create a uuid for this bookmark so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_BOOKMARK_PENDING, ADD_BOOKMARK_SUCCESS, ADD_BOOKMARK_ERROR],
    callAPI: () => API.post('/bookmarks', { ...bookmark, id }),
    payload: { id }
  };
};

export const fetchBookmark = id => ({
  types: [REQ_BOOKMARK_PENDING, REQ_BOOKMARK_SUCCESS, REQ_BOOKMARK_ERROR],
  callAPI: () => API.get(`/bookmarks/${id}`),
  shouldCallAPI: state => {
    const bookmark = state.bookmarks.byId[id] || {};
    const { loadedAt, isLoading } = bookmark;
    if (!bookmark || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

export const fetchBookmarks = () => ({
  // types for this action - "request, success, error"
  types: [REQ_BOOKMARKS_PENDING, REQ_BOOKMARKS_SUCCESS, REQ_BOOKMARKS_ERROR],
  //  a function used to call the api
  callAPI: () => API.get('/bookmarks'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.bookmarks;
    // if bookmarks items are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have the bookmarks item or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export const deleteBookmark = id => ({
  types: [
    DELETE_BOOKMARK_PENDING,
    DELETE_BOOKMARK_SUCCESS,
    DELETE_BOOKMARK_ERROR
  ],
  callAPI: () => API.delete(`/bookmarks/${id}`),
  payload: { id }
});
