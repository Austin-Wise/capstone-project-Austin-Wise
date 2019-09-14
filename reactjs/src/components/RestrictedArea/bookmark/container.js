import { connect } from 'react-redux';

import {
  fetchBookmarks,
  deleteBookmark
} from '../../../redux/store/cat/bookmark/actions';
import { fetchArticle } from '../../../redux/store/cat/article/actions';
import { fetchNotes } from '../../../redux/store/cat/note/actions';

function mapStateToProps(state) {
  const {
    bookmarks: { byId, allIds },
    articles: { byId: articles },
    notes: { byId: notes, allIds: notesIds }
  } = state;
  // turn the array of ids into an array of objects
  return {
    bookmarks: allIds.map(id => ({
      ...byId[id].data,
      article: (articles[byId[id].data.articleId] || {}).data || {}
    })),
    notes: notesIds.map(id => notes[id].data)
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchBookmarks,
  fetchArticle,
  deleteBookmark,
  fetchNotes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
