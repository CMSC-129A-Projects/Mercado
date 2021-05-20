import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Alert from './Alert';

const NavigationBar = ({ isAuthenticated }) => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="/">Mercado</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/shop">Shop</a>
                            </li>

                            {
                                isAuthenticated
                                ? (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/profile">Account</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/cart">Cart</a>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">Login</a>
                                    </li>
                                )
                            }

                            <li className="nav-item">
                                <a className="nav-link" href="contact-us/">Contact Us</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input 
                                className="px-2 search" 
                                type="text" 
                                aria-label="Search" 

                            />
                            <button className="search-btn" type="submit">Search</button>
                        </form>
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

export default connect(mapStateToProps, {})(NavigationBar);