import React from 'react';
import { connect } from 'react-redux';

const SellerProfile = ({ isAuthenticated, user }) => {
    return (
        <>

        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {})(SellerProfile);