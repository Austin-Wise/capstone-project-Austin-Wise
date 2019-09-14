import { connect } from 'react-redux';

import { fetchArticles } from '../../../redux/store/cat/article/actions';
import {
  fetchBookmarks,
  createBookmark,
  deleteBookmark
} from '../../../redux/store/cat/bookmark/actions';
import { fetchCompanyData } from '../../../redux/store/cat/companyData/actions';
// bracket vs dot notation - dot is exact, bracket is relative
function mapStateToProps(state, props) {
  const { match } = props;

  const {
    companyData: {
      byId: { [match.params.ticker]: { data: companyData } = {} }
    },
    bookmarks: { byId: bookmarkId, allIds: allBookmarkIds },
    articles: { byId, allIds }
  } = state;
  // turn the array of ids into an array of objects
  const bookmarks = allBookmarkIds
    .map(id => bookmarkId[id].data || {})
    .filter(item => item.ticker === match.params.ticker);
  const articles = allIds
    .map(id => byId[id].data || {})
    .filter(item => item.ticker === match.params.ticker);
  return {
    articles,
    companyData,
    bookmarks
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchArticles,
  fetchBookmarks,
  createBookmark,
  deleteBookmark,
  fetchCompanyData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
