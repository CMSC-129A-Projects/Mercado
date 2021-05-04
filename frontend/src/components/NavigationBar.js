import React, { Fragment } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';

import Alert from './Alert';
import { logout } from '../actions/auth';

const NavigationBar = ({ logout }) => {
    const logout_user = () => {
        logout();
    };

    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="" onClick={logout_user}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Alert />
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavigationBar);