import API from '../../../../API';

import {
  REQ_NOTE_PENDING,
  REQ_NOTE_SUCCESS,
  REQ_NOTE_ERROR
} from '../../actionTypes';

const fetchNote = () => ({
  // types for this action - "request, success, error"
  types: [REQ_NOTE_PENDING, REQ_NOTE_SUCCESS, REQ_NOTE_ERROR],
  //  a function used to call the api
  callAPI: () => API.get('/note')
});

export default fetchNote;
