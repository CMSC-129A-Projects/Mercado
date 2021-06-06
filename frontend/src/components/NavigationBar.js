import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import '../css/navigationBar.css';

import Alert from './Alert';

const NavigationBar = ({ isAuthenticated }) => {
    return (
        <Fragment>
            <Alert />

            <header className="p-3 mb-3 border-bottom sticky-top" style={{ backgroundColor: "#faf1e6" }}>
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d=flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                            <img src="logo192.png" alt="Mercado logo" height="32" />
                        </a>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li>
                                <a href="/shop" className="nav-link px-2 link-secondary">
                                    SHOP
                                </a>
                            </li>
                            <li>
                                <a href="/categories" className="nav-link px-2 link-secondary">
                                    CATEGORY
                                </a>
                            </li>
                            <li>
                                <a href="/cart" className="nav-link px-2 link-secondary">
                                    CART
                                </a>
                            </li>
                        </ul>
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input 
                                type="search"
                                className="form-control"
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </form>
                        <div className="dropdown text-end">
                            <a 
                                href="" 
                                className="d-block link-dark text-decoration-none dropdown-toggle"
                                id="dropdownUser"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://github.com/mdo.png" 
                                    alt="mdo"
                                    width="32"
                                    height="32"
                                    className="rounded-circle"
                                />
                            </a>
                            <ul 
                                className="dropdown-menu text-small"
                                aria-labelledby="dropdownUser"
                            >
                                <li>
                                    <a className="dropdown-item" href="/profile">
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/">
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(NavigationBar);