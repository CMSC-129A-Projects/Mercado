import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { create_user } from '../actions/auth';

const Signup = ({ create_user, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    
    const [formData, setFormData] = useState({
        phoneNumber: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        rePassword: ''
    });

    const { phoneNumber, firstName, lastName, username, password, rePassword } = formData;

    const onChange = e => {
        if (e.target.name === 'phoneNumber') {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                setFormData({ ...formData, [e.target.name]: e.target.value });
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        if (password === rePassword) {
            let phone = '+63' + phoneNumber;
            create_user(phone, firstName, lastName, username, password, rePassword);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated)
        return <Redirect to="/" />;

    if (accountCreated)
        return <Redirect to="/login" />;

    return (
        <div className="outer">
            <div className="inner mt-4">
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <img src="images/logo1.png" alt="logo" style={{ maxHeight: "200px", width: "auto" }} />
                    </div>
                    
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="phonePrefix">(+63)</span>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="phoneNumber" 
                                        name="phoneNumber"
                                        placeholder="9*********" 
                                        aria-label="9*********"
                                        aria-describedby="phonePrefix"
                                        maxLength={10}
                                        required={true}
                                        value={phoneNumber}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        required={true}
                                        value={firstName}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        required={true}
                                        value={lastName}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        required={true}
                                        value={username}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        required={true}
                                        value={password}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="rePassword" className="form-label">Confirm Password</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        id="rePassword"
                                        name="rePassword"
                                        placeholder="Confirm Password"
                                        required={true}
                                        value={rePassword}
                                        onChange={e => onChange(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-3">
                            <button type="submit" className="btn btn-outline-secondary" style={{ background: "rgba(175, 167, 140, 1)" }}>
                                CREATE MY ACCOUNT NOW
                            </button>

                            <p className="forgot-password text-center">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { create_user })(Signup);