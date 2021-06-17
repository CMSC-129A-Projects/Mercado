import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './hocs/Layout';
import SignupPhone from './containers/SignupPhone';
import SignupPhoneVerify from './containers/SignupPhoneVerify';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Home from './containers/Home';
import LocationSetup from './containers/LocationSetup';
import Logout from './containers/Logout';
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
            <Route path="/buyer/signup" component={SignupPhone} />
            <Route path="/buyer/verifyphone" render={(props) => <SignupPhoneVerify {...props} />} />
            <Route path="/buyer/createaccount" render={(props) => <Signup {...props} />} />
            <Route path="/profile/setuplocation" component={LocationSetup} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
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