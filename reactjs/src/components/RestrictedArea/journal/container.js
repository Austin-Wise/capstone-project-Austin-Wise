import { connect } from 'react-redux';

import {
  fetchJournals,
  createJournal,
  deleteJournal,
  updateJournal
} from '../../../redux/store/cat/journal/actions';

function mapStateToProps(state) {
  const {
    journals: { byId, allIds }
  } = state;
  // turn the array of ids into an array of objects
  return { journals: allIds.map(id => byId[id].data || {}) };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchJournals,
  createJournal,
  deleteJournal,
  updateJournal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
