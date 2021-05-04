import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';

const Home = ({ isAuthenticated }) => {
    if (!isAuthenticated)
        return <Redirect to="/login" />;

    return (
        <React.Fragment>
            <NavigationBar />
            <div className="album py-5 bg-light">
                <div className="container">

                    <div className="pb-3 h5">All Books</div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
                        <p>Product</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Home);