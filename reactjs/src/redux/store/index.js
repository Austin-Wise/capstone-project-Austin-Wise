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

// combine multiple reducers into one
const rootReducer = combineReducers({});

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

export default store;
