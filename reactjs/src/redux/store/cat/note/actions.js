/* eslint-disable import/prefer-default-export */
import uuid from 'uuid/v4';
import API from '../../../../API';

import {
  ADD_NOTE_PENDING,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR,
  REQ_NOTE_PENDING,
  REQ_NOTE_SUCCESS,
  REQ_NOTE_ERROR,
  REQ_NOTES_PENDING,
  REQ_NOTES_SUCCESS,
  REQ_NOTES_ERROR,
  UPDATE_NOTE_PENDING,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_ERROR,
  DELETE_NOTE_PENDING,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR
} from '../../actionTypes';

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

export const createNote = note => {
  // create a uuid for this note so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_NOTE_PENDING, ADD_NOTE_SUCCESS, ADD_NOTE_ERROR],
    callAPI: () => API.post('/notes', { ...note, id }),
    payload: { id }
  };
};

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

export const updateNote = note => ({
  types: [UPDATE_NOTE_PENDING, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_ERROR],
  callAPI: () => API.put(`/notes/${note.id}`, note),
  payload: { id: note.id }
});

export const deleteNote = id => ({
  types: [DELETE_NOTE_PENDING, DELETE_NOTE_SUCCESS, DELETE_NOTE_ERROR],
  callAPI: () => API.delete(`/notes/${id}`),
  payload: { id }
});
