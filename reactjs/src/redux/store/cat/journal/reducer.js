import createReducer from '../../helpers/createReducer';

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

const initialState = {
  // will hold each journal with ids as keys
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

function journalPending(state, action) {
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

function journalSuccess(state, action) {
  // clear loading and error, update cache time, add journals
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
          id: action.payload.id
        }
      }
    },
    allIds: [...new Set([...state.allIds, action.payload.id])]
  };
}

function journalError(state, action) {
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
function journalsPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function journalsSuccess(state, action) {
  // clear loading and error, update cache time, add journals
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    byId: {
      ...state.byId,
      ...action.data.reduce(
        (journals, journal) => ({
          // keep the current object
          ...journals,
          // add the journals id as the key and an journal object for loading
          [journal.id]: {
            data: journal,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allIds: [
      ...new Set([...state.allIds, ...action.data.map(journal => journal.id)])
    ]
  };
}

function journalsError(state, action) {
  // clear loading and set error
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

function deleteJournalSuccess(state, action) {
  // clear loading and error, update cache time, add journals
  const { [action.payload.id]: deletedJournal, ...withoutJournal } = state.byId;
  return {
    ...state,
    byId: withoutJournal,
    allIds: state.allIds.filter(id => id !== action.payload.id)
  };
}

export default createReducer(initialState, {
  [ADD_JOURNAL_PENDING]: journalPending,
  [ADD_JOURNAL_SUCCESS]: journalSuccess,
  [ADD_JOURNAL_ERROR]: journalError,
  [REQ_JOURNAL_PENDING]: journalPending,
  [REQ_JOURNAL_SUCCESS]: journalSuccess,
  [REQ_JOURNAL_ERROR]: journalError,
  [REQ_JOURNALS_PENDING]: journalsPending,
  [REQ_JOURNALS_SUCCESS]: journalsSuccess,
  [REQ_JOURNALS_ERROR]: journalsError,
  [UPDATE_JOURNAL_PENDING]: journalPending,
  [UPDATE_JOURNAL_SUCCESS]: journalSuccess,
  [UPDATE_JOURNAL_ERROR]: journalError,
  [DELETE_JOURNAL_PENDING]: journalPending,
  [DELETE_JOURNAL_SUCCESS]: deleteJournalSuccess,
  [DELETE_JOURNAL_ERROR]: journalError
});
