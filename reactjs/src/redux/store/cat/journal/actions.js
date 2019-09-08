import API from '../../../../API';

import {
  REQ_JOURNAL_PENDING,
  REQ_JOURNAL_SUCCESS,
  REQ_JOURNAL_ERROR
} from '../../actionTypes';

const fetchJournal = () => ({
  // types for this action - "request, success, error"
  types: [REQ_JOURNAL_PENDING, REQ_JOURNAL_SUCCESS, REQ_JOURNAL_ERROR],
  callAPI: () => API.get('/journal')
});

export default fetchJournal;
