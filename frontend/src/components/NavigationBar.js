import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Alert from './Alert';
import { logout } from '../actions/auth';

const NavigationBar = ({ isAuthenticated, logout }) => {
    const logout_user = () => {
        logout();
    };

    const navItems = (
        isAuthenticated
        ? (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="" onClick={logout_user}>Logout</a>
                    </li>
                </ul>
        )
        : (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/login">Login</a>
                    </li>
                </ul>
        )
    );

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Mercado</a>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex mr-auto">
                            <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-secondary" type="submit">Search</button>
                        </form>
                        {navItems}
                    </div>
                </div>
            </nav>
            <Alert />
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavigationBar);