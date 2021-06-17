import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../actions/auth';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const Login = ({ error, isAuthenticated, login }) => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: ''
    });

    const { phoneNumber, password } = formData;

    const [isPhoneValid, setIsPhoneValid] = useState(null);

    // * Redirect authenticated users
    if (isAuthenticated) return <Redirect to="/" />;
        
    const onChange = e => {
        if (e.target.name === 'phoneNumber') {
            const re = /^\+|[0-9\b]+$/;
            const phoneRe = /^(9)\d{9}$/;

            if (e.target.value === '' || re.test(e.target.value))
                setFormData({ ...formData, [e.target.name]: e.target.value });

            if (e.target.value === '')
                setIsPhoneValid(null);
            setIsPhoneValid(phoneRe.test(e.target.value));
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        login('+63'+phoneNumber, password);
    };

    const renderErrors = () => {
        if (error) {
            for (const field in error) {
                if (error[field]) {
                    if (typeof(error[field]) === 'object')
                        for (const i in error[field])
                            return error[field][i];
                    else
                        return error[field];
                }
            }
        }
    };

    return (
        <>
            <NavigationBar pageType="login" />
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-6">
                            <div className="shadow p-3 mt-5 mb-5 bg-white rounded">
                                <div className="row text-center">
                                    <p className="text-danger">{renderErrors()}</p>
                                    <div className="col">
                                        <img 
                                            src="/images/mercado-bag.png" 
                                            alt="Mercado logo" 
                                            height="200" 
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col text-center">
                                        <h1 
                                            className="signup-showcase" 
                                            style={{
                                                fontFamily: "'Shrikhand', Helvetica", 
                                                color: "#47512c"
                                            }}
                                        >Welcome back</h1>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <form className="needs-validation" onSubmit={e => onSubmit(e)}>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <div className="input-group">
                                                        <span 
                                                            className="input-group-text"
                                                            style={{
                                                                backgroundColor: "#c6bda4",
                                                                color: "#47512c"
                                                            }}
                                                        >
                                                            <strong>(+63)</strong>
                                                        </span>
                                                        <input 
                                                            className={
                                                                'form-control'
                                                                + (
                                                                    isPhoneValid === null
                                                                    ? '' : (
                                                                        !isPhoneValid || (error && error['phone_number'])
                                                                        ? ' is-invalid' 
                                                                        : ' is-valid'
                                                                    )
                                                                )
                                                            }
                                                            type="text"
                                                            name="phoneNumber"
                                                            id="phoneNumber"
                                                            placeholder="Phone Number"
                                                            maxLength={10}
                                                            required
                                                            value={phoneNumber}
                                                            onChange={e => onChange(e)}
                                                        />
                                                        <div className="invalid-feedback text-start">
                                                            {
                                                                error && error['phone_number']
                                                                ? error['phone_number'].map((key, value) => {
                                                                    return error['phone_number'][value];
                                                                })
                                                                : 'Invalid phone number'
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <input
                                                        className={
                                                            'form-control form-control-lg'
                                                            + (
                                                                error 
                                                                && error['password']
                                                                && ' is-invalid'
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
                                                    <div className="invalid-feedback">
                                                        {
                                                            error
                                                            && error['password'] 
                                                            && error['password'][0]
                                                        }
                                                    </div>
                                                    <a className="form-text float-end mt-1" href="/resetpassword">Forgot password?</a>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">SIGN IN</button>
                                        </form>
                                    </div>
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

export default connect(mapStateToProps, { login })(Login);