import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Landing from './components/landing';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/landing" component={Footer} />
        <Route exact path="/landing" component={Landing} />
      </Router>
    </div>
  );
}

export default App;
