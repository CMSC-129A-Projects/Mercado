import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { refreshToken, checkAuthenticated, loadUser } from '../actions/auth';

const Layout = ({ isLoading, refreshToken, checkAuthenticated, loadUser, children }) => {
    useEffect(() => {
        refreshToken();
        checkAuthenticated();
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return (<>Loading...</>);
    } else {
        return (<>{children}</>);
    }
};

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { refreshToken, checkAuthenticated, loadUser })(Layout);