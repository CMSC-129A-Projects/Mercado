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
            <div class="album py-5 bg-light">
                <div class="container">

                    <div class="pb-3 h5">All Books</div>
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">

                        {/* {% for product in products %} */}

                        <div class="col">
                            <div class="card shadow-sm">
                                <img class="img-fluid" alt="Responsive image" src=""></img>
                                <div class="card-body">
                                    <p class="card-text">
                                        <a class="text-dark text-decoration-none" href="">Product Title</a>
                                    </p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <small class="text-muted">9min read</small>
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