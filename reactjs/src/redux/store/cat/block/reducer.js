import createReducer from '../../helpers/createReducer';

import {
  ADD_BLOCK_PENDING,
  ADD_BLOCK_SUCCESS,
  ADD_BLOCK_ERROR,
  REQ_BLOCK_PENDING,
  REQ_BLOCK_SUCCESS,
  REQ_BLOCK_ERROR,
  REQ_BLOCKS_PENDING,
  REQ_BLOCKS_SUCCESS,
  REQ_BLOCKS_ERROR,
  DELETE_BLOCK_PENDING,
  DELETE_BLOCK_SUCCESS,
  DELETE_BLOCK_ERROR
} from '../../actionTypes';

const initialState = {
  // will hold each block with ids as keys
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

function blockPending(state, action) {
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

function blockSuccess(state, action) {
  // clear loading and error, update cache time, add blocks
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

function blockError(state, action) {
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
function blocksPending(state, action) {
  // set loading state and clear error
  return {
    ...state,
    isLoading: true,
    error: null
  };
}

function blocksSuccess(state, action) {
  // clear loading and error, update cache time, add blocks
  return {
    ...state,
    isLoading: false,
    error: null,
    loadedAt: Date.now(),
    byId: {
      ...state.byId,
      ...action.data.reduce(
        (blocks, block) => ({
          // keep the current object
          ...blocks,
          // add the blocks id as the key and an block object for loading
          [block.id]: {
            data: block,
            isLoading: false,
            loadedAt: Date.now(),
            error: null
          }
        }),
        {}
      )
    },
    allIds: [
      ...new Set([...state.allIds, ...action.data.map(block => block.id)])
    ]
  };
}

function blocksError(state, action) {
  // clear loading and set error
  return {
    ...state,
    isLoading: false,
    error: action.err
  };
}

function deleteBlockSuccess(state, action) {
  // clear loading and error, update cache time, add blocks
  const { [action.payload.id]: deletedBlock, ...withoutBlock } = state.byId;
  return {
    ...state,
    byId: withoutBlock,
    allIds: state.allIds.filter(id => id !== action.payload.id)
  };
}

export default createReducer(initialState, {
  [ADD_BLOCK_PENDING]: blockPending,
  [ADD_BLOCK_SUCCESS]: blockSuccess,
  [ADD_BLOCK_ERROR]: blockError,
  [REQ_BLOCK_PENDING]: blockPending,
  [REQ_BLOCK_SUCCESS]: blockSuccess,
  [REQ_BLOCK_ERROR]: blockError,
  [REQ_BLOCKS_PENDING]: blocksPending,
  [REQ_BLOCKS_SUCCESS]: blocksSuccess,
  [REQ_BLOCKS_ERROR]: blocksError,
  [DELETE_BLOCK_PENDING]: blockPending,
  [DELETE_BLOCK_SUCCESS]: deleteBlockSuccess,
  [DELETE_BLOCK_ERROR]: blockError
});
