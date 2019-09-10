import { connect } from 'react-redux';
import { fetchBlock } from '../../../redux/store/cat/block/actions';

function mapStateToProps(state) {
  const {
    blocks: { byId, allIds }
  } = state;
  // turn the array of ids into an array of objects
  return { blocks: allIds.map(id => byId[id].data) };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchBlock };

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
