/* eslint-disable import/prefer-default-export */
import API from '../../../../API';

import {
  REQ_ARTICLE_PENDING,
  REQ_ARTICLE_SUCCESS,
  REQ_ARTICLE_ERROR,
  REQ_ARTICLES_PENDING,
  REQ_ARTICLES_SUCCESS,
  REQ_ARTICLES_ERROR,
} from '../../actionTypes';

// cache data for 5 minutes
const CACHE_TIME = 1000 * 60 * 5;

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
  payload: { id },
});

export const fetchArticles = keyword => ({
  // types for this action - "request, success, error"
  types: [REQ_ARTICLES_PENDING, REQ_ARTICLES_SUCCESS, REQ_ARTICLES_ERROR],
  //  a function used to call the api
  callAPI: () => API.get(`/articles?ticker=${keyword}`),
  // receives the current app state and returns true if we should call the api
  shouldCallAPI: () => true,
});
