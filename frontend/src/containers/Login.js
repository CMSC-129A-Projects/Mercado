import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';

import Alert from '../components/Alert';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: ''
    });

    const { phoneNumber, password } = formData;

    const [isPhoneValid, setIsPhoneValid] = useState(null);

    if (isAuthenticated)
        return <Redirect to="/" />;
        
    const onChange = e => {
        if (e.target.name === 'phoneNumber') {
            const re = /^[0-9\b]+$/;
            const phoneRe = /^(+639)\d{9}$/;

            if (e.target.value === '' || re.test(e.target.value)) {
                setFormData({ ...formData, [e.target.name]: e.target.value });
            }

            if (e.target.value !== '')
                setIsPhoneValid(phoneRe.test(e.target.value));
            else
                setIsPhoneValid(null);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        login(phoneNumber, password);
    };


    return (
        <Fragment>
            <Alert />

            <div className="outer">
                <div className="inner">
                    <div className="container mt-4">
                        <div className="row justify-content-center">
                            <img src="images/logo1.png" alt="logo" />
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
                            </div>

                            <div className="row justify-content-center mt-3">
                                <Button variant="primary" type="submit">
                                    Log in
                                </Button>
                            </div>
                            <p className="forgot-password text-center">
                                Forgot <Link to="/reset_password">Password?</Link>
                            </p>
                            <p className="forgot-password text-center">
                                Don't have an account? <Link to="/signup">Sign Up</Link>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);