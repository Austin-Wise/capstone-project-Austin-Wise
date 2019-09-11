import createReducer from '../../helpers/createReducer';

import {
  ADD_TICKER_PENDING,
  ADD_TICKER_SUCCESS,
  ADD_TICKER_ERROR,
  REQ_TICKER_PENDING,
  REQ_TICKER_SUCCESS,
  REQ_TICKER_ERROR,
  REQ_TICKERS_PENDING,
  REQ_TICKERS_SUCCESS,
  REQ_TICKERS_ERROR,
  DELETE_TICKER_PENDING,
  DELETE_TICKER_SUCCESS,
  DELETE_TICKER_ERROR
} from '../../actionTypes';

const initialState = {
  // will hold each ticker with ids as keys
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

function tickerPending(state, action) {
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

function tickerSuccess(state, action) {
  // clear loading and error, update cache time, add tickers
  // under data, grab id from payload instead of data.. endpoint id vs frontend generated id messes this up.
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

function tickerError(state, action) {
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
function tickersPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function tickersSuccess(state, action) {
  // clear loading and error, update cache time, add tickers
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    byId: {
      ...state.byId,
      ...action.data.reduce(
        (tickers, ticker) => ({
          // keep the current object
          ...tickers,
          // add the tickers id as the key and an ticker object for loading
          [ticker.id]: {
            data: ticker,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allIds: [
      ...new Set([...state.allIds, ...action.data.map(ticker => ticker.id)])
    ]
  };
}

function tickersError(state, action) {
  // clear loading and set error
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

function deleteTickerSuccess(state, action) {
  // clear loading and error, update cache time, add tickers
  const { [action.payload.id]: deletedTicker, ...withoutTicker } = state.byId;
  return {
    ...state,
    byId: withoutTicker,
    allIds: state.allIds.filter(id => id !== action.payload.id)
  };
}

export default createReducer(initialState, {
  [ADD_TICKER_PENDING]: tickerPending,
  [ADD_TICKER_SUCCESS]: tickerSuccess,
  [ADD_TICKER_ERROR]: tickerError,
  [REQ_TICKER_PENDING]: tickerPending,
  [REQ_TICKER_SUCCESS]: tickerSuccess,
  [REQ_TICKER_ERROR]: tickerError,
  [REQ_TICKERS_PENDING]: tickersPending,
  [REQ_TICKERS_SUCCESS]: tickersSuccess,
  [REQ_TICKERS_ERROR]: tickersError,
  [DELETE_TICKER_PENDING]: tickerPending,
  [DELETE_TICKER_SUCCESS]: deleteTickerSuccess,
  [DELETE_TICKER_ERROR]: tickerError
});
