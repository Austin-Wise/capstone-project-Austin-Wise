import { combineReducers, applyMiddleware, createStore } from 'redux';

// CombineReducers: Converges multiple reducers into one;
// ApplyMiddleware: Support Async Action
// CreateStore: Creates a redux store that holds the complete state-tree

import thunkMiddleware from 'redux-thunk';

// Thunk lets the action creators invert control by dispatching functions (called Thunks).
// They would receive dispatch as an argument and may call it asynchronously.

import { createLogger } from 'redux-logger';

// redux-logger logs actions when dispatching them before reducers reduce the state.

// combine multiple reducers into one
const rootReducer = combineReducers({});

// set up middleware
const middleware = applyMiddleware(thunkMiddleware, createLogger());

// create a redux store using the combined reducer and middleware functions
const store = createStore(rootReducer, middleware);

export default store;
