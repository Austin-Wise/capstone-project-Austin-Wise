import { connect } from 'react-redux';

import { fetchBookmark } from '../../../redux/store/cat/bookmark/actions';
import { fetchNote, deleteNote } from '../../../redux/store/cat/note/actions';

function mapStateToProps(state) {
  const {
    bookmarks: { byId, allIds },
    notes: { byId: notes }
  } = state;
  // turn the array of ids into an array of objects
  return {
    bookmarks: allIds.map(id => ({
      ...byId[id].data,
      note: notes[byId[id].data.noteId].data || {}
    }))
  };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchBookmark, fetchNote, deleteNote };

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
