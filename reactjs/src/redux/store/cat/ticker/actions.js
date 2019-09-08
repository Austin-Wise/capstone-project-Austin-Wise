import API from '../../../../API';

import {
  REQ_TICKER_PENDING,
  REQ_TICKER_SUCCESS,
  REQ_TICKER_ERROR
} from '../../actionTypes';

const fetchTicker = () => ({
  // types for this action - "request, success, error"
  types: [REQ_TICKER_PENDING, REQ_TICKER_SUCCESS, REQ_TICKER_ERROR],
  callAPI: () => API.get('/ticker')
});

export default fetchTicker;
