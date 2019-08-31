import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Landing from './components/LandingGroup/landing';
import UserArea from './components/Main/userArea';

function App() {
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

export default App;
