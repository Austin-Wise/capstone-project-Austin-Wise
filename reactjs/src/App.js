import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
      <div className="App" id="#override">
        <Router>
          <Switch>
            {!loggedIn && <Route path="/" component={Landing} />}
            {loggedIn && <Route path="/" component={UserArea} />}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
