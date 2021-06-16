import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './hocs/Layout';
import Home from './containers/Home';
import LocationSetup from './containers/LocationSetup';
import Login from './containers/Login';
import Logout from './containers/Logout';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Profile from './containers/Profile';
import Shop from './containers/Shop';
import Product from './containers/Product';
import SellerHome from './containers/seller/SellerHome';
import SellerSignup from './containers/seller/SellerSignup';
import SellerProfile from './containers/seller/SellerProfile';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/buyer/signup" component={Signup} />
            <Route path="/setup-your-location" component={LocationSetup} />
            <Route path="/reset_password" component={ResetPassword} />
            <Route path="/profile" component={Profile} />
            <Route path="/browse/all" component={Shop} />
            <Route path="/activate/:uid/:token" component={Activate} />
            <Route path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
            <Route path="/product/:slug" component={Product} />
            <Route path="/sellercenter" component={SellerHome} />
            <Route path="/seller/signup" component={SellerSignup} />
            <Route path="/seller/profile" component={SellerProfile} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;