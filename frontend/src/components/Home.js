import React from 'react';
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
            <div className="album py-5 bg-light">
                <div className="container">

                    <div className="pb-3 h5">All Books</div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">

                        {/* {% for product in products %} */}

                        <div className="col">
                            <div className="card shadow-sm">
                                <img className="img-fluid" alt="Responsive" src=""></img>
                                <div className="card-body">
                                    <p className="card-text">
                                        <a className="text-dark text-decoration-none" href="#">Product Title</a>
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">9min read</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* {% endfor %} */}

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