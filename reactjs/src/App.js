import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Landing from './components/LandingGroup/landing';
import NotFound from './components/notFound';

function App() {
  const loggedIn = false;
  return (
    <div className="App" id="#override">
      <Router>{!loggedIn && <Route path="/" component={Landing} />}</Router>
    </div>
  );
}

export default App;
