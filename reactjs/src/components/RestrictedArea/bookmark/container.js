import { connect } from 'react-redux';

import {
  fetchBookmarks,
  deleteBookmark
} from '../../../redux/store/cat/bookmark/actions';
import { fetchArticle } from '../../../redux/store/cat/article/actions';

function mapStateToProps(state) {
  const {
    bookmarks: { byId, allIds },
    articles: { byId: articles }
  } = state;
  // turn the array of ids into an array of objects
  return {
    bookmarks: allIds.map(id => ({
      ...byId[id].data,
      article: articles[byId[id].data.articleId].data || {}
    }))
  };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchBookmarks, fetchArticle, deleteBookmark };

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
