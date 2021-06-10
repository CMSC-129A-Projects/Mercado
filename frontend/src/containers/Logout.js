import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';

const Logout = ({ logout }) => {
    logout();
    return <Redirect to="/login" />;
};

export default connect(null, { logout })(Logout);