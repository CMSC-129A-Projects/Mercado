import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/signup.css';
import { createUser } from '../actions/auth';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const Signup = ({ error, isAuthenticated, createUser, ...props }) => {
    const [formData, setFormData] = useState({
        phoneNumber: '+63'+props.location.state.phoneNumber,
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        userType: 'BUYER',
        password: '',
        rePassword: ''
    });
    
    const { 
        firstName, 
        lastName, 
        username, 
        email,
        password, 
        rePassword
    } = formData;

    const [passwordMatch, setPasswordMatch] = useState(null);

    const onChange = e => {
        if (e.target.name === 'password' || e.target.name === 'rePassword')
            setPasswordMatch(e.target.value === password);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();

        if (password === rePassword) {
            createUser(formData);
            return <Redirect to="/account/location-setup" />;
        }
    };

    const renderErrors = () => {
        if (error)
            for (const field in error)
                if (error[field])
                    for (const i in error[field])
                        return error[field][i];
    };

    // ? Condition statement not tested 
    if (!props.location.state)  return <Redirect to="/signup" />;

    // * Redirect to home if user is logged in
    if (isAuthenticated) return <Redirect to="/" />;

    return (
        <>
            <NavigationBar pageType="signup" />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-6">
                            <div className="shadow p-3 mb-3 bg-white rounded">
                                <div className="row text-center">
                                    <p className="text-danger">{renderErrors()}</p>
                                    <div className="col">
                                        <img 
                                            src="/images/mercado-bag.png" 
                                            alt="Mercado logo" 
                                            height="150" 
                                        />
                                    </div>
                                    <div className="col mt-5 text-start">
                                        <h4>Create your Mercado account</h4>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <form className="needs-validation" onSubmit={e => onSubmit(e)}>
                                            <div className="row mb-1">
                                                <div className="col">
                                                    <div className="form-floating">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="username"
                                                            id="username"
                                                            placeholder="Username"
                                                            maxLength="25"
                                                            required
                                                            value={username}
                                                            onChange={e => onChange(e)}
                                                        />
                                                        <label htmlFor="username" className="form-label">Username
                                                            <span className="text-danger"> *</span></label>
                                                        <div className="invalid-feedback">
                                                            {
                                                                error && 
                                                                error['username'] && 
                                                                error['username'][0]
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-1">
                                                <div className="col pe-1">
                                                    <div className="form-floating">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="firstName"
                                                            id="firstName"
                                                            placeholder="First Name"
                                                            required
                                                            value={firstName}
                                                            onChange={e => onChange(e)}
                                                        />
                                                        <label htmlFor="firstName" className="form-label">First Name
                                                            <span className="text-danger"> *</span></label>
                                                        <div className="invalid-feedback">This field is required</div>
                                                    </div>
                                                </div>
                                                <div className="col ps-0">
                                                    <div className="form-floating">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="lastName"
                                                            id="lastName"
                                                            placeholder="Last Name"
                                                            required
                                                            value={lastName}
                                                            onChange={e => onChange(e)}
                                                        />
                                                        <label htmlFor="lastName" className="form-label">Last Name
                                                        <span className="text-danger"> *</span></label>
                                                        <div className="invalid-feedback">This field is required</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-1">
                                                <div className="col">
                                                    <div className="form-floating">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="email"
                                                            id="email"
                                                            placeholder="Email"
                                                            maxLength="100"
                                                            value={email}
                                                            onChange={e => onChange(e)}
                                                        />
                                                        <label htmlFor="email" className="form-label">Email</label>
                                                        <div className="invalid-feedback">
                                                            {
                                                                error &&
                                                                error['email'] &&
                                                                error['email'][0]
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col pe-1">
                                                    <div className="form-floating">
                                                        <input
                                                            className={
                                                                'form-control'
                                                                + (
                                                                    passwordMatch === null
                                                                    ? '' : (
                                                                        !passwordMatch || (error && error['password'])
                                                                        ? ' is-invalid'
                                                                        : ' is-valid'
                                                                    )
                                                                )
                                                            }
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                            placeholder="Password"
                                                            maxLength="50"
                                                            required
                                                            value={password}
                                                            onChange={e => onChange(e)}
                                                        />
                                                        <label htmlFor="password" className="form-label">Password
                                                            <span className="text-danger"> *</span></label>
                                                        <div className="invalid-feedback">
                                                            {
                                                                error &&
                                                                error['password'] &&
                                                                error['password'][0]
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ps-0">
                                                    <div className="form-floating">
                                                        <input
                                                            className={
                                                                'form-control'
                                                                + (
                                                                    passwordMatch === null
                                                                    ? '' : (
                                                                        !passwordMatch || (error && error['password'])
                                                                        ? ' is-invalid'
                                                                        : ' is-valid'
                                                                    )
                                                                )
                                                            }
                                                            type="password"
                                                            name="rePassword"
                                                            id="rePassword"
                                                            placeholder="Confirm Password"
                                                            maxLength="50"
                                                            required
                                                            value={rePassword}
                                                            onChange={e => onChange(e)}
                                                        />
                                                        <label htmlFor="rePassword" className="form-label">Confirm Password
                                                            <span className="text-danger"> *</span></label>
                                                        <div className="invalid-feedback">Passwords do not match</div>
                                                    </div>
                                                </div>
                                                <div className="form-text text-start">Password must be at least 8 character</div>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-lg w-100">Create Account</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="form-text text-center">By continuing, you agree to Mercado's
                                    <span>
                                        <a href="/"> Terms of Service </a> 
                                        &amp; <a href="/">Privacy Policy</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { createUser })(Signup);