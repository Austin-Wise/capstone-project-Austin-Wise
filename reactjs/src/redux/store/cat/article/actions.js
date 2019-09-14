/* eslint-disable import/prefer-default-export */
import uuid from 'uuid/v4';
import API from '../../../../API';

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

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

export const createArticle = article => {
  // create a uuid for this article so that we can use it in the reducer for pending and loading
  const id = uuid();
  return {
    types: [ADD_ARTICLE_PENDING, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_ERROR],
    callAPI: () => API.post('/articles', { ...article, id }),
    payload: { id }
  };
};

export const fetchArticle = id => ({
  types: [REQ_ARTICLE_PENDING, REQ_ARTICLE_SUCCESS, REQ_ARTICLE_ERROR],
  callAPI: () => API.get(`/articles/${id}`),
  shouldCallAPI: state => {
    const article = state.articles.byId[id] || {};
    const { loadedAt, isLoading } = article;
    if (!article || isLoading) return false;
    const isCached = Date.now() - loadedAt < CACHE_TIME;
    return !loadedAt || !isCached;
  },
  payload: { id }
});

export const fetchArticles = keyword => ({
  // types for this action - "request, success, error"
  types: [REQ_ARTICLES_PENDING, REQ_ARTICLES_SUCCESS, REQ_ARTICLES_ERROR],
  //  a function used to call the api
  callAPI: () => API.get(`/articles?ticker=${keyword}`),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: () => true
});

export const deleteArticle = id => ({
  types: [DELETE_ARTICLE_PENDING, DELETE_ARTICLE_SUCCESS, DELETE_ARTICLE_ERROR],
  callAPI: () => API.delete(`/articles/${id}`),
  payload: { id }
});
