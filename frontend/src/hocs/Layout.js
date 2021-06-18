import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { refreshToken } from '../actions/auth';

const Layout = ({ isLoading, refreshToken, children }) => {
    useEffect(() => {
        refreshToken();
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

export default connect(mapStateToProps, { refreshToken })(Layout);