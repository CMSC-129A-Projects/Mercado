import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from './NavigationBar';

const Home = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <React.Fragment>
            <NavigationBar />
            <h1>Home</h1>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Home);