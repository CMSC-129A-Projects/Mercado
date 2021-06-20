import React from 'react';
import { connect } from 'react-redux';

import '../css/navigationBar.css';
import Alert from './Alert';

const NavigationBar = ({ user, ...props}) => {
    const renderLinks = () => {
        switch (props.pageType) {
            case 'authenticated':
                return (
                    <>
                        <li>
                            <a href="/products" className="nav-link px-2">
                                SHOP
                            </a>
                        </li>
                        <li>
                            <a 
                                href="/cart" 
                                className="nav-link px-2"
                                data-bs-toggle="tooltip" 
                                data-bs-placement="top" 
                                title="Shopping Bag"
                            >
                                <span className="material-icons">
                                    shopping_bag
                                </span>
                            </a>
                        </li>
                    </>
                )
            case 'shop':
                return (
                    (                            
                        <li>
                            <a 
                                href="/cart" 
                                className="nav-link px-2"
                                data-bs-toggle="tooltip" 
                                data-bs-placement="top" 
                                title="Shopping Bag"
                            >
                                <span className="material-icons">
                                    shopping_bag
                                </span>
                            </a>
                        </li>
                    )
                )
            case 'signup':
                return (
                    <>
                        <li>
                            <a href="/login" className="nav-link px-2">LOGIN</a>
                        </li>
                    </>
                )
            case 'login':
                return (
                    <>
                        <li>
                            <a href="/signup" className="nav-link px-2">SIGNUP</a>
                        </li>
                    </>
                );
            default:
                return (<></>);
        }
    };

    return (
        <>
            <Alert />
            <header className="p-1 border-bottom sticky-top nav">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d=flex align-items-center mb-2 me-md-5 mb-lg-0 text-decoration-none mercado-brand">
                            <span>
                                <img 
                                    src="/images/mercado-bag.png" 
                                    alt="Mercado logo"
                                    height="60" 
                                />
                            </span>
                            Mercado
                        </a>
                        <div className="col"></div>
                        {
                            (props.pageType === 'authenticated' || props.pageType === 'shop')
                            && (
                                <form className="col-6 col-lg-auto me-lg-auto ms-3 mb-2 justify-content-center mb-md-0" style={{ width: "50%"}}>
                                    <input 
                                        type="search"
                                        className="form-control"
                                        placeholder="Search for products, categories, and shops"
                                        aria-label="Search"
                                    />
                                </form>
                            )
                        }
                        <div className="col"></div>
                        <ul className="nav col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            {renderLinks()}
                        </ul>
                        {
                            (props.pageType === 'authenticated' || props.pageType === 'shop') && user
                            && (
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
                                            <a className="dropdown-item" href={`/account/${user.username}`}>
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/logout">
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </div>
            </header>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(NavigationBar);