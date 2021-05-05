import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import Layout from './hocs/Layout';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Product from './containers/Product';
import Profile from './containers/Profile';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Router>
          <Layout>
            <div className="App">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/activate/:uid/:token" component={Activate} />
                <Route path="/reset_password" component={ResetPassword} />
                <Route path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
                <Route path="/product/:id" component={Product} />
                <Route path="/profile" component={Profile} />
              </Switch>
            </div>
          </Layout>
        </Router>
      </React.Fragment>
    </Provider>
  );
}

export default App;