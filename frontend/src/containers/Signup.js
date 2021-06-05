import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/signup.css';

import Alert from '../components/Alert';
import { createUser } from '../actions/auth';
import { setAlert } from '../actions/alert';

const Signup = ({ createUser, isAuthenticated, setAlert }) => {
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState({
        phoneNumber: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        rePassword: ''
    });
    
    const { phoneNumber, firstName, lastName, username, password, rePassword } = formData;

    const [isPhoneValid, setIsPhoneValid] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(null);

    const onChange = e => {
        if (e.target.name === 'phoneNumber') {
            const re = /^[0-9\b]+$/;
            const phoneRe = /^(09)\d{9}$/;

            if (e.target.value === '' || re.test(e.target.value))
                setFormData({ ...formData, [e.target.name]: e.target.value });

            if (e.target.value !== '')
                setIsPhoneValid(phoneRe.test(e.target.value));
            else
                setIsPhoneValid(null);
        } else if (e.target.name === 'rePassword') {
            if (e.target.value === password)
                setPasswordMatch(true);
            else
                setPasswordMatch(false);
            setFormData({ ...formData, [e.target.name]: e.target.value });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        if (password === rePassword) {
            createUser(phoneNumber, firstName, lastName, username, password, rePassword);
            return <Redirect to="/setup-your-location" />;
        } else {
            setAlert('Passwords do not match.', 'warning');
        }
    };
    
    const onNext = (e, p, isPhoneValid) => {
        if (!isPhoneValid)
            return setIsPhoneValid(false);
        setPage(p);
    };

    const onKeyPress = (e, isPhoneValid) => {
        if(e.which === 13) {
            e.preventDefault();
            onNext(e, 2, isPhoneValid);
        }
    }

    if (isAuthenticated)
        return <Redirect to="/" />;

    const page1 = (
        <div className="container">
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
                            <div className="col text-center">
                                <h1>Start shopping now!</h1>
                                <p>Enter your phone number.</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <form className="needs-validation">
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
                                            placeholder="09 * * * * * * * * *"
                                            maxLength={11}
                                            required
                                            value={phoneNumber}
                                            onChange={e => onChange(e)}
                                            onKeyPress={e => onKeyPress(e, isPhoneValid)}
                                            
                                        />
                                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                        <div className="invalid-feedback mt-3 text-start">
                                            Use 09xxxxxxxxx format.
                                        </div>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary mt-3" 
                                        style={{ width: "100%" }} 
                                        onClick={e => onNext(e, page+1, isPhoneValid)}
                                    >
                                        Next
                                    </button>
                                </form>
                                <p className="text-muted mt-5"><a href="/login">SIGN IN</a> instead.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );

    const page2 = (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col-6">
                    <div className="shadow p-3 mt-5 mb-5 bg-white rounded">
                        <div className="row">
                            <div className="col">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <button className="btn" onClick={e => setPage(1)}><span className="material-icons">arrow_back</span></button>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <img className="" src="images/mer-1@1x.png" alt="Mercado logo" height="150" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col text-center">
                                <h1>You're almost there!</h1>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <form className="needs-validation" onSubmit={e => onSubmit(e)}>
                                    <div className="row mb-3">
                                        <div className="col">
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
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <div className="invalid-feedback">
                                                    This field is required.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
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
                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                <div className="invalid-feedback">
                                                    This field is required.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    placeholder="Username"
                                                    maxLength={25}
                                                    required
                                                    value={username}
                                                    onChange={e => onChange(e)}
                                                />
                                                <label htmlFor="username" className="form-label">Username</label>
                                                <div className="invalid-feedback">
                                                    This field is required.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    className={
                                                        'form-control'
                                                        + (
                                                            passwordMatch === null
                                                            ? ''
                                                            : (
                                                                passwordMatch
                                                                ? ''
                                                                : ' is-invalid'
                                                            )
                                                        )
                                                    }
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
                                                <div className="invalid-feedback">
                                                    This field is required.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    className={
                                                        'form-control'
                                                        + (
                                                            passwordMatch === null
                                                            ? ''
                                                            : (
                                                                passwordMatch
                                                                ? ''
                                                                : ' is-invalid'
                                                            )
                                                        )
                                                    }
                                                    type="password"
                                                    name="rePassword"
                                                    id="rePassword"
                                                    placeholder="Confirm Password"
                                                    required
                                                    value={rePassword}
                                                    onChange={e => onChange(e)}
                                                />
                                                <label htmlFor="rePassword" className="form-label">Confirm Password</label>
                                                <div className="invalid-feedback">
                                                    Passwords do not match.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-text text-start">
                                            Password must be at least 8 characters.
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary mt-3" 
                                        style={{ width: "100%" }} 
                                    >
                                        Create Account
                                    </button>
                                </form>
                                <p className="text-muted mt-5"><a href="/login">SIGN IN</a> instead.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );

    const renderPageSwitch = (page, page1, page2) => {
        switch (page) {
            case 1:
                return page1;
            case 2:
                return page2;
            default:
                return page1;
        }
    };

    return (
        <Fragment>
            <Alert/>

            {renderPageSwitch(page, page1, page2)}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { createUser, setAlert })(Signup);