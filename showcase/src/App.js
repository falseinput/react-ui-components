import React from 'react';
import './App.scss';

import ReactSearchbox from './ReactSearchbox';

import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


function App() {
  return (
    <Router basename="/">
      <Switch>
          <Route path="/react-searchbox" component={ReactSearchbox} />
      </Switch>
    </Router>
  )
}

export default App;
