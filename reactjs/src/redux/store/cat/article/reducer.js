import createReducer from '../../helpers/createReducer';

import {
  ADD_ARTICLE_PENDING,
  ADD_ARTICLE_SUCCESS,
  ADD_ARTICLE_ERROR,
  REQ_ARTICLE_PENDING,
  REQ_ARTICLE_SUCCESS,
  REQ_ARTICLE_ERROR,
  REQ_ARTICLES_PENDING,
  REQ_ARTICLES_SUCCESS,
  REQ_ARTICLES_ERROR,
  DELETE_ARTICLE_PENDING,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_ERROR
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

function deleteArticleSuccess(state, action) {
  // clear loading and error, update cache time, add blocks
  const { [action.payload.id]: deletedArticle, ...withoutArticle } = state.byId;
  return {
    ...state,
    byId: withoutArticle,
    allIds: state.allIds.filter(id => id !== action.payload.id)
  };
}

export default createReducer(initialState, {
  [ADD_ARTICLE_PENDING]: articlePending,
  [ADD_ARTICLE_SUCCESS]: articleSuccess,
  [ADD_ARTICLE_ERROR]: articleError,
  [REQ_ARTICLE_PENDING]: articlePending,
  [REQ_ARTICLE_SUCCESS]: articleSuccess,
  [REQ_ARTICLE_ERROR]: articleError,
  [REQ_ARTICLES_PENDING]: articlesPending,
  [REQ_ARTICLES_SUCCESS]: articlesSuccess,
  [REQ_ARTICLES_ERROR]: articlesError,
  [DELETE_ARTICLE_PENDING]: articlePending,
  [DELETE_ARTICLE_SUCCESS]: deleteArticleSuccess,
  [DELETE_ARTICLE_ERROR]: articleError
});
