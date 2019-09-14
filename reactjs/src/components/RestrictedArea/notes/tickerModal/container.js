import { connect } from 'react-redux';
import {
  fetchTicker,
  createTicker
} from '../../../../redux/store/cat/ticker/actions';

function mapStateToProps(state) {
  const {
    tickers: { byId, allIds }
  } = state;
  // turn the array of ids into an array of objects
  return { tickers: allIds.map(id => byId[id].data) };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchTicker, createTicker };

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
