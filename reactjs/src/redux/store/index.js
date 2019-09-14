import { combineReducers, applyMiddleware, createStore } from 'redux';
// CombineReducers: Converges multiple reducers into one;
// ApplyMiddleware: Support Async Action
// CreateStore: Creates a redux store that holds the complete state-tree

import thunkMiddleware from 'redux-thunk';
// Thunk lets the action creators invert control by dispatching functions (called Thunks).
// They would receive dispatch as an argument and may call it asynchronously.

import { createLogger } from 'redux-logger';
// redux-logger logs actions when dispatching them before reducers reduce the state.

// middleware to help with api calls

import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import callAPI from './helpers/callAPIMiddleware';

// List of all reducers
import blocks from './cat/block/reducer';
import bookmarks from './cat/bookmark/reducer';
import journals from './cat/journal/reducer';
import notes from './cat/note/reducer';
import tickers from './cat/ticker/reducer';
import articles from './cat/article/reducer';
import companyData from './cat/companyData/reducer';
// combine multiple reducers into one
const rootReducer = combineReducers({
  blocks,
  bookmarks,
  journals,
  notes,
  tickers,
  articles,
  companyData
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// set up middleware
const middleware = applyMiddleware(thunkMiddleware, callAPI, createLogger());

// create a redux store using the combined reducer and middleware functions
export const store = createStore(persistedReducer, middleware);

export const persistor = persistStore(store);
