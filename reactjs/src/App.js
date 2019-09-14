import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// ?Provider makes the Redux store available to any nested components that have been wrapped in the connect() function.
import { store, persistor } from './redux/store';
import Landing from './components/UnrestrictedArea';
import UserArea from './components/RestrictedArea';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const loggedIn = true;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              {!loggedIn && <Route path="/" component={Landing} />}
              {loggedIn && <Route path="/" component={UserArea} />}
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
