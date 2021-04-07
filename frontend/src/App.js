import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (<Router>
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={SignUp} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;