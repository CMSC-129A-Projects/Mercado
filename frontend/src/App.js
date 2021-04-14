import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';

function App() {
  return (
    <React.Fragment>
      <Router>
      <div className="App">
        <div className="outer">
          <div className="inner">
            <Switch>
              <Route path="/" component={Signup} />
              <Route path="/login" component={Login} />
              <Route exact path="/home" component={HomePage} />
            </Switch>
          </div>
        </div>
      </div>
      </Router>
    </React.Fragment>
  );
}

export default App;