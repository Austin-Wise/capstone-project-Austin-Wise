import { connect } from 'react-redux';

import { forgotPassword } from '../../../../redux/store/cat/auth/actions';

function mapStateToProps(state) {
  return {};
}

// set the actions we need in this component
const mapDispatchToProps = {
  forgotPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
