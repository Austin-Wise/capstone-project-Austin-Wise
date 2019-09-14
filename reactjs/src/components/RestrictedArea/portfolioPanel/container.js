import { connect } from 'react-redux';

import {
  fetchTickers,
  deleteTicker
} from '../../../redux/store/cat/ticker/actions';
import { fetchCompanyData } from '../../../redux/store/cat/companyData/actions';

function mapStateToProps(state) {
  const {
    tickers: { byId, allIds },
    companyData: { byId: companyData }
  } = state;
  // turn the array of ids into an array of objects

  // ...companyData followed by ...byid results in the companyData.id to be overridden by the ticker.id
  return {
    tickers: allIds.map(id => ({
      ...(companyData[byId[id].data.symbol] || {}).data,
      ...byId[id].data
    }))
  };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchTickers, fetchCompanyData, deleteTicker };

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
