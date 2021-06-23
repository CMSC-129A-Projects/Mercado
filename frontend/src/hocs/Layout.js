import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { refreshToken } from '../actions/auth';

const Layout = ({ refreshToken, children }) => {
    useEffect(() => {
        refreshToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<>{children}</>);
};

export default connect(null, { refreshToken })(Layout);