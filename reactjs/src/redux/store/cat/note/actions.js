/* eslint-disable import/prefer-default-export */
import API from '../../../../API';

import {
  REQ_NOTE_PENDING,
  REQ_NOTE_SUCCESS,
  REQ_NOTE_ERROR,
  REQ_NOTES_PENDING,
  REQ_NOTES_SUCCESS,
  REQ_NOTES_ERROR,
  DELETE_NOTE_PENDING,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR
} from '../../actionTypes';

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

export const fetchNote = id => ({
  types: [REQ_NOTE_PENDING, REQ_NOTE_SUCCESS, REQ_NOTE_ERROR],
  callAPI: () => API.get(`/notes/${id}`),
  shouldCallAPI: state => {
    const note = state.notes.byId[id] || {};
    const { loadedAt, isLoading } = note;
    if (!note || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

export const fetchNotes = () => ({
  // types for this action - "request, success, error"
  types: [REQ_NOTES_PENDING, REQ_NOTES_SUCCESS, REQ_NOTES_ERROR],
  //  a function used to call the api
  callAPI: () => API.get('/notes'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.notes;
    // if note items are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have the note item or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export const deleteNote = id => ({
  types: [DELETE_NOTE_PENDING, DELETE_NOTE_SUCCESS, DELETE_NOTE_ERROR],
  callAPI: () => API.delete(`/bookmarks/${id}`),
  payload: { id }
});
