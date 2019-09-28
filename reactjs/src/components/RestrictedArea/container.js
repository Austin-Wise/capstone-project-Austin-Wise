import { connect } from 'react-redux';
import { logout } from '../../redux/store/cat/auth/actions';

// set the actions we need in this component
const mapDispatchToProps = {
  logout,
};

export default connect(
  undefined,
  mapDispatchToProps
);
