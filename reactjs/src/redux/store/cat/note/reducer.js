import createReducer from '../../helpers/createReducer';

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

const initialState = {
  // will hold each note with ids as keys
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

function notePending(state, action) {
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

function noteSuccess(state, action) {
  // clear loading and error, update cache time, add notes
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

function noteError(state, action) {
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
function notesPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function notesSuccess(state, action) {
  // clear loading and error, update cache time, add notes
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    byId: {
      ...state.byId,
      ...action.data.reduce(
        (notes, note) => ({
          // keep the current object
          ...notes,
          // add the notes id as the key and an note object for loading
          [note.id]: {
            data: note,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allIds: [...new Set([...state.allIds, ...action.data.map(note => note.id)])]
  };
}

function notesError(state, action) {
  // clear loading and set error
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

function deleteNoteSuccess(state, action) {
  // clear loading and error, update cache time, add notes
  const { [action.payload.id]: deletedNote, ...withoutNote } = state.byId;
  return {
    ...state,
    byId: withoutNote,
    allIds: state.allIds.filter(id => id !== action.payload.id)
  };
}

export default createReducer(initialState, {
  [ADD_NOTE_PENDING]: notePending,
  [ADD_NOTE_SUCCESS]: noteSuccess,
  [ADD_NOTE_ERROR]: noteError,
  [REQ_NOTE_PENDING]: notePending,
  [REQ_NOTE_SUCCESS]: noteSuccess,
  [REQ_NOTE_ERROR]: noteError,
  [REQ_NOTES_PENDING]: notesPending,
  [REQ_NOTES_SUCCESS]: notesSuccess,
  [REQ_NOTES_ERROR]: notesError,
  [UPDATE_NOTE_PENDING]: notePending,
  [UPDATE_NOTE_SUCCESS]: noteSuccess,
  [UPDATE_NOTE_ERROR]: noteError,
  [DELETE_NOTE_PENDING]: notePending,
  [DELETE_NOTE_SUCCESS]: deleteNoteSuccess,
  [DELETE_NOTE_ERROR]: noteError
});
