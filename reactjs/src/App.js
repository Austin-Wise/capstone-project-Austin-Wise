import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PersistGate } from 'redux-persist/integration/react';
// ? Provider makes the Redux store available to any nested components that have been wrapped in the connect() function.
import { store, persistor } from './redux/store';
import Landing from './components/UnrestrictedArea';
import UserArea from './components/RestrictedArea';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <MyRoutes />
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

function Routes({ loggedIn }) {
  return (
    <Router>
      <Switch>
        {!loggedIn && <Route path="/" component={Landing} />}
        {loggedIn && (
          <Route
            path={['/news/:ticker', '/journal', '/bookmark', '/settings', '/']}
            component={UserArea}
          />
        )}
      </Switch>
    </Router>
  );
}
const MyRoutes = connect(state => ({ loggedIn: state.auth.loggedIn }))(Routes);

export default App;

App.propTypes = {
  loggedIn: PropTypes.func.isRequired,
};
