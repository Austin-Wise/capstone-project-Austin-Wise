import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Landing from './components/LandingGroup/landing';
import UserArea from './components/Main/userArea';

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
