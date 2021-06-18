import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import Layout from './hocs/Layout';
import Home from './containers/Home';
import Login from './containers/Login';
import Logout from './containers/Logout';
import SignupPhone from './containers/SignupPhone';
import SignupPhoneVerify from './containers/SignupPhoneVerify';
import Signup from './containers/Signup';
import LocationSetup from './containers/LocationSetup';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Profile from './containers/Profile';
import Shop from './containers/Shop';
import Product from './containers/Product';
import SellerHome from './containers/seller/SellerHome';
import SellerProfile from './containers/seller/SellerProfile';
import Activate from './containers/Activate';

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
            <Route path="/signup" component={SignupPhone} />
            <Route path="/signup/phone-verification" render={(props) => <SignupPhoneVerify {...props} />} />
            <Route path="/signup/finishing-up" render={(props) => <Signup {...props} />} />
            <Route path="/account/location-setup" component={LocationSetup} />
            <Route path="/account/password-reset" component={ResetPassword} />
            <Route path="/account/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
            <Route path="/account/:username" component={Profile} />
            <Route path="/products" component={Shop} />
            <Route path="/products/:slug" component={Product} />
            <Route path="/activate/:uid/:token" component={Activate} />
            <Route path="/seller-center" component={SellerHome} />
            <Route path="/seller-center/:username" component={SellerProfile} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;