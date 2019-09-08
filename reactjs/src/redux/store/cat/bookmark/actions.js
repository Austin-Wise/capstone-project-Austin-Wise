import API from '../../../../API';

import {
  REQ_BOOKMARK_PENDING,
  REQ_BOOKMARK_SUCCESS,
  REQ_BOOKMARK_ERROR
} from '../../actionTypes';

const fetchBookmark = () => ({
  // types for this action - "request, success, error"
  types: [REQ_BOOKMARK_PENDING, REQ_BOOKMARK_SUCCESS, REQ_BOOKMARK_ERROR],
  callAPI: () => API.get('/bookmark')
});

export default fetchBookmark;
