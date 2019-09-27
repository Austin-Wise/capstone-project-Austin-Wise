import { connect } from 'react-redux';

import { signUp } from '../../../../redux/store/cat/auth/actions';

function mapStateToProps(state) {
  return {};
}

// set the actions we need in this component
const mapDispatchToProps = {
  signUp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
