import { connect } from 'react-redux';

import {
  fetchNote,
  deleteNote,
  createNote,
  updateNote
} from '../../../redux/store/cat/note/actions';

function mapStateToProps(state, props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const {
    notes: {
      byId: { [id]: { data: note } = {} }
    }
  } = state;
  // turn the array of ids into an array of objects
  return {
    note
  };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchNote, deleteNote, createNote, updateNote };

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
