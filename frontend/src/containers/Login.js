import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
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
            const re = /^\+|[0-9\b]+$/;
            const phoneRe = /^(\+639)\d{9}$/;

            if (e.target.value === '' || re.test(e.target.value)) {
                setFormData({ ...formData, [e.target.name]: e.target.value });
            }

            if (e.target.value === '')
                setIsPhoneValid(null);
            setIsPhoneValid(phoneRe.test(e.target.value));
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

            <div className="container mt-5">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-6">
                        <div className="shadow p-3 mt-5 mb-5 bg-white rounded">
                            <div className="row">
                                <div className="col">
                                <img className="mb-3" src="images/mer-1@1x.png" alt="" height="200" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <h5><strong>Welcome back</strong></h5>
                                </div>
                            </div>
                            <div className="ro mb-3">
                                <div className="col">
                                    <form className="needs-validation">
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input
                                                        className={
                                                            'form-control'
                                                            + (
                                                                isPhoneValid === null
                                                                ? ''
                                                                : (
                                                                    isPhoneValid
                                                                    ? ' is-valid'
                                                                    : ' is-invalid'
                                                                )
                                                            )
                                                        }
                                                        type="text"
                                                        name="phoneNumber"
                                                        id="phoneNumber"
                                                        placeholder="+639xxxxxxxxx"
                                                        maxLength={13}
                                                        required
                                                        value={phoneNumber}
                                                        onChange={e => onChange(e)}
                                                    />
                                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                                    <div className="invalid-feedback text-start">
                                                        Must start with +639
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Password"
                                                        maxLength={25}
                                                        required
                                                        value={password}
                                                        onChange={e => onChange(e)}
                                                    />
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn btn-primary"
                                            style={{ width: "100%" }} 
                                            onClick={e => onSubmit(e)}
                                        >
                                            SIGN IN
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <a className="mt-5" href="/signup"><h6>CREATE AN ACCOUNT</h6></a>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);