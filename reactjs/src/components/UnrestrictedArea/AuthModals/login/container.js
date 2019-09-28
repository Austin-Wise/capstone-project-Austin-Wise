import { connect } from 'react-redux';

import { login } from '../../../../redux/store/cat/auth/actions';

function mapStateToProps(state) {
  return {};
}

// set the actions we need in this component
const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
