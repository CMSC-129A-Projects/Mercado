import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../css/seller-signup.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { createUser } from '../../actions/auth';

const SellerSignup = ({ createUser, error }) => {
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState({
        phoneNumber: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        userType: 'SELLER',
        password: '',  
        rePassword: ''
    });

    const {
        phoneNumber,
        firstName,
        lastName,
        username,
        email,
        password,
        rePassword
    } = formData;

    const [isPhoneValid, setIsPhoneValid] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(null);

    const onChange = e => {
        if (e.target.name === 'phoneNumber') {
            const re = /^\+|[0-9\b]+$/;
            const phoneRe = /^(9)\d{9}$/;

            if (e.target.value === '' || re.test(e.target.value))
                setFormData({ ...formData, [e.target.name]: e.target.value });
            setIsPhoneValid(phoneRe.test(e.target.value));
        } else {
            if (e.target.name === 'rePassword')
                setPasswordMatch(e.target.value === password);
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        if (passwordMatch) {
            const phone = '+63' + phoneNumber;
            createUser({ ...formData, phoneNumber: phone });

            if (!error)
                return <Redirect to="/seller/profile" />;
        }
    };

    const onNext = e => {
        if (!isPhoneValid)
            return setIsPhoneValid(false);
        setPage(page+1);
    };

    const onKeyPress = e => {
        if (e.which === 13) {
            e.preventDefault();
            onNext(e);
        }
    };

    const renderErrors = () => {
        if (error) {
            for (const field in error) {
                if (error[field]) {
                    for (const i in error[field]) {
                        let message = '';
                            message += `${error[field][i]}\n`;
                        return message;
                    }
                }
            }
        }
    };

    const pages = {
        1: (
            // Step 1: Shop owner phone number.
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-6">
                        <div className="shadow p-3 mt-3 mb-5 bg-white rounded">
                            <div className="row text-center">
                                <div className="col">
                                    <p className="text-danger">{renderErrors()}</p>
                                    <img 
                                        src="/images/mercado-bag.png" 
                                        alt="Mercado logo" 
                                        width="200"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col text-center">
                                    <h1
                                        className="seller-signup-showcase"
                                        style={{
                                            fontFamily: "'Shrikhand', Helvetica",
                                            color: "#47512c",
                                            textShadow: "2px 2px #beb7a3"
                                        }}
                                    >SELL YOUR PRODUCTS</h1>
                                    <p>Enter your phone number to create an account</p>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col">
                                    <form className="needs-validation">
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
                                                    'form-control form-control-lg'
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
                                                onKeyPress={e => onKeyPress(e, isPhoneValid)}
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
                                        <button 
                                            type="button" 
                                            className="btn btn-primary btn-lg w-100 mt-3" 
                                            disabled={!isPhoneValid}
                                            onClick={e => onNext(e)}
                                        >Next</button>
                                    </form>
                                </div>
                            </div>
                            <div className="form-text text-center">By continuing, you agree to Mercado's
                                <span>
                                    <a href="/terms"> Terms of Service </a> 
                                    &amp; <a href="/privacypolicy">Privacy Policy</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        ),
        2: (
            // Step 2: Shop owner personal information.
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-6">
                        <div className="shadow p-3 mt-3 mb-5 bg-white rounded">
                            <div className="row">
                                <div className="col">
                                    {/* Breadcrumb nav to go back to step 1.  */}
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <button 
                                                className="btn" 
                                                onClick={e => setPage(page-1)}
                                                title="Previous"
                                            >
                                                <span className="material-icons">arrow_back</span>
                                            </button>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="row mb-3 text-center">
                                <div className="col">
                                    <p className="text-danger">{renderErrors()}</p>
                                    <h1>Owner Information</h1>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <form className="needs-validation" onSubmit={e => onSubmit(e)}>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        name="username"
                                                        id="username"
                                                        placeholder="Username"
                                                        maxLength="25"
                                                        required
                                                        autoFocus
                                                        value={username}
                                                        onChange={e => onChange(e)}
                                                    />
                                                    <label htmlFor="username" className="form-label">Username
                                                        <span className="text-danger"> *</span></label>
                                                    <div className="invalid-feedback">This field is required</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
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
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
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
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name="email"
                                                        id="email"
                                                        placeholder="Email"
                                                        maxLength="100"
                                                        value={email}
                                                        onChange={e => onChange(e)}
                                                    />
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <div className="invalid-feedback">Please enter a valid email</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input 
                                                        type="password" 
                                                        className={
                                                            'form-control'
                                                            + (
                                                                passwordMatch === null
                                                                ? '' : (
                                                                    passwordMatch && password.length >= 8
                                                                    ? ' is-valid' 
                                                                    : ' is-invalid'
                                                                )
                                                            )
                                                        }
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
                                                    <div className="invalid-feedback">Password must be at least 8 characters</div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-floating">
                                                    <input 
                                                        type="password" 
                                                        className={
                                                            'form-control'
                                                            + (
                                                                passwordMatch === null
                                                                ? '' : (
                                                                    passwordMatch
                                                                    ? ' is-valid' 
                                                                    : ' is-invalid'
                                                                )
                                                            )
                                                        }
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
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-lg w-100">Create Account</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        )
    };

    const renderPages = pages => { return pages[page]};

    return (
        <>
            <NavigationBar 
                authenticated={false}
            />
            {renderPages(pages)}
            <Footer />
        </>
    );
};

const mapStateToProps = state => ({
    error: state.auth.error
});

export default connect(mapStateToProps, { createUser })(SellerSignup);