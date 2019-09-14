import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// ?Provider makes the Redux store available to any nested components that have been wrapped in the connect() function.

import Landing from './components/UnrestrictedArea';
import UserArea from './components/RestrictedArea';
import store from './redux/store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const loggedIn = false;
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {!loggedIn && <Route path="/" component={Landing} />}
            {loggedIn && <Route path="/" component={UserArea} />}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
