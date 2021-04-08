import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import VerifyPasswordChangePage from './components/VerifyPasswordChangePage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ResetPasswordConfirmPage from './components/ResetPasswordConfirmPage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/verify" component={VerifyPasswordChangePage} />
          <Route path="/reset_password" component={ResetPasswordPage} />
          <Route path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirmPage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;