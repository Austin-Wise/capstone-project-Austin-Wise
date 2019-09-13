/* eslint-disable import/prefer-default-export */
import uuid from 'uuid/v4';
import API from '../../../../API';

import {
  ADD_JOURNAL_PENDING,
  ADD_JOURNAL_SUCCESS,
  ADD_JOURNAL_ERROR,
  REQ_JOURNAL_PENDING,
  REQ_JOURNAL_SUCCESS,
  REQ_JOURNAL_ERROR,
  REQ_JOURNALS_PENDING,
  REQ_JOURNALS_SUCCESS,
  REQ_JOURNALS_ERROR,
  UPDATE_JOURNAL_PENDING,
  UPDATE_JOURNAL_SUCCESS,
  UPDATE_JOURNAL_ERROR,
  DELETE_JOURNAL_PENDING,
  DELETE_JOURNAL_SUCCESS,
  DELETE_JOURNAL_ERROR
} from '../../actionTypes';

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

export const createJournal = journal => {
  // create a uuid for this journal so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_JOURNAL_PENDING, ADD_JOURNAL_SUCCESS, ADD_JOURNAL_ERROR],
    callAPI: () => API.post('/journals', { ...journal, id }),
    payload: { id }
  };
};

export const fetchJournal = id => ({
  types: [REQ_JOURNAL_PENDING, REQ_JOURNAL_SUCCESS, REQ_JOURNAL_ERROR],
  callAPI: () => API.get(`/journals/${id}`),
  shouldCallAPI: state => {
    const journal = state.journals.byId[id] || {};
    const { loadedAt, isLoading } = journal;
    if (!journal || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

export const fetchJournals = () => ({
  // types for this action - "request, success, error"
  types: [REQ_JOURNALS_PENDING, REQ_JOURNALS_SUCCESS, REQ_JOURNALS_ERROR],
  //  a function used to call the api
  callAPI: () => API.get('/journals'),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: state => {
    const { loadedAt, isLoading } = state.journals;
    // if journal items are currently loading don't call again
    if (isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    // if we don't have the journal item or it's beyond the cache timeout make the api call
    return !loadedAt || !isCached;
  }
});

export const updateJournal = journal => ({
  types: [UPDATE_JOURNAL_PENDING, UPDATE_JOURNAL_SUCCESS, UPDATE_JOURNAL_ERROR],
  callAPI: () => API.put(`/journals/${journal.id}`, journal),
  payload: { id: journal.id }
});

export const deleteJournal = id => ({
  types: [DELETE_JOURNAL_PENDING, DELETE_JOURNAL_SUCCESS, DELETE_JOURNAL_ERROR],
  callAPI: () => API.delete(`/journals/${id}`),
  payload: { id }
});
