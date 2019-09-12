import createReducer from '../../helpers/createReducer';

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

const initialState = {
  // will hold each bookmark with ids as keys
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

function bookmarkPending(state, action) {
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

function bookmarkSuccess(state, action) {
  // clear loading and error, update cache time, add bookmarks
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

function bookmarkError(state, action) {
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
function bookmarksPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function bookmarksSuccess(state, action) {
  // clear loading and error, update cache time, add bookmarks
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    byId: {
      ...state.byId,
      ...action.data.reduce(
        (bookmarks, bookmark) => ({
          // keep the current object
          ...bookmarks,
          // add the bookmarks id as the key and an bookmark object for loading
          [bookmark.id]: {
            data: bookmark,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allIds: [
      ...new Set([...state.allIds, ...action.data.map(bookmark => bookmark.id)])
    ]
  };
}

function bookmarksError(state, action) {
  // clear loading and set error
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

function deleteBookmarkSuccess(state, action) {
  // clear loading and error, update cache time, add bookmarks
  const {
    [action.payload.id]: deletedBookmark,
    ...withoutBookmark
  } = state.byId;
  return {
    ...state,
    byId: withoutBookmark,
    allIds: state.allIds.filter(id => id !== action.payload.id)
  };
}

export default createReducer(initialState, {
  [ADD_BOOKMARK_PENDING]: bookmarkPending,
  [ADD_BOOKMARK_SUCCESS]: bookmarkSuccess,
  [ADD_BOOKMARK_ERROR]: bookmarkError,
  [REQ_BOOKMARK_PENDING]: bookmarkPending,
  [REQ_BOOKMARK_SUCCESS]: bookmarkSuccess,
  [REQ_BOOKMARK_ERROR]: bookmarkError,
  [REQ_BOOKMARKS_PENDING]: bookmarksPending,
  [REQ_BOOKMARKS_SUCCESS]: bookmarksSuccess,
  [REQ_BOOKMARKS_ERROR]: bookmarksError,
  [DELETE_BOOKMARK_PENDING]: bookmarkPending,
  [DELETE_BOOKMARK_SUCCESS]: deleteBookmarkSuccess,
  [DELETE_BOOKMARK_ERROR]: bookmarkError
});
