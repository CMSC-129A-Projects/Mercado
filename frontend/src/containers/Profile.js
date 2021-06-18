import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';
import { logout } from '../actions/auth';

const Profile = ({ isAuthenticated, user, logout }) => {
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    
    if (isAuthenticated !== null && !isAuthenticated)
        return <Redirect to="/login" />;

    if (user !== null && user.user_address.locality === '')
        return <Redirect to="/account/location-setup" />;

    const logout_user = (e) => {
        logout();
        setLogoutSuccess(true);
    };


    if (logoutSuccess) return <Redirect to="/login" />;

    return (
        <Fragment>
            <NavigationBar pageType="authenticated" />

            <div className="container mt-5">
                <h1>{user && user.first_name} {user && user.last_name}</h1>
                <button type="button" className="btn btn-sm btn-outline-warning" onClick={e => logout_user(e)}>
                    Logout
                </button>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Profile);