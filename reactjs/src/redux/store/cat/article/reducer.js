import createReducer from '../../helpers/createReducer';

import {
  REQ_ARTICLE_PENDING,
  REQ_ARTICLE_SUCCESS,
  REQ_ARTICLE_ERROR,
  REQ_ARTICLES_PENDING,
  REQ_ARTICLES_SUCCESS,
  REQ_ARTICLES_ERROR
} from '../../actionTypes';

const initialState = {
  // will hold each article with ids as keys
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

function articlePending(state, action) {
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

function articleSuccess(state, action) {
  // clear loading and error, update cache time, add articles
  return {
    ...state,
    byId: {
      ...state.byId,
      [action.payload.id]: {
        isLoading: false,
        error: null,
        loadedAt: Date.now(),
        data: action.data
      }
    },
    allIds: [...new Set([...state.allIds, action.payload.id])]
  };
}

function articleError(state, action) {
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

function articlesPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function articlesSuccess(state, action) {
  // clear loading and error, update cache time, add articles
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    byId: {
      ...state.byId,
      ...action.data.reduce(
        (articles, article) => ({
          // keep the current object
          ...articles,
          // add the article id as the key and an article object for loading
          [article.id]: {
            data: article,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allIds: [
      ...new Set([...state.allIds, ...action.data.map(article => article.id)])
    ]
  };
}

function articlesError(state, action) {
  // clear loading and set error
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

export default createReducer(initialState, {
  [REQ_ARTICLE_PENDING]: articlePending,
  [REQ_ARTICLE_SUCCESS]: articleSuccess,
  [REQ_ARTICLE_ERROR]: articleError,
  [REQ_ARTICLES_PENDING]: articlesPending,
  [REQ_ARTICLES_SUCCESS]: articlesSuccess,
  [REQ_ARTICLES_ERROR]: articlesError
});
