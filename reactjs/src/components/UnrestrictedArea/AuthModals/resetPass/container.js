import { connect } from 'react-redux';

import { resetPassword } from '../../../../redux/store/cat/auth/actions';

function mapStateToProps(state) {
  return {};
}

// set the actions we need in this component

const mapDispatchToProps = {
  resetPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
