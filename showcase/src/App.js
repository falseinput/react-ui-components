import React from 'react';
import './App.scss';

import TomtomReactSearchbox from './TomtomReactSearchbox';

import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


function App() {
  return (
    <Router basename="/">
      <Switch>
          <Route path="/tomtom-react-searchbox" component={TomtomReactSearchbox} />
      </Switch>
    </Router>
  )
}

export default App;
