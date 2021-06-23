import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'

const SignupPhone = ({ error, isAuthenticated, ...props }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isPhoneValid, setIsPhoneValid] = useState(null)

    const onChange = e => {
        const re = /^\+|[0-9\b]+$/
        const phoneRe = /^(\9)\d{9}$/

        if (e.target.value === '' || re.test(e.target.value))
            setPhoneNumber(e.target.value)
        setIsPhoneValid(phoneRe.test(e.target.value))
    }

    const onSubmit = e => {
        e.preventDefault()
        props.history.push({
            pathname: '/signup_finishing-up',
            state: { phoneNumber: phoneNumber}
        })
    }

    if (isAuthenticated) return <Redirect to="/" />

    return (
        <>
            <NavigationBar pageType="signup" />
            <main>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-6">
                            <div className="shadow p-3 mt-5 mb-5 bg-white rounded">
                                <div className="row text-center">
                                    <div className="col">
                                        <img 
                                            className="mb-3" 
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
                                        >SHOP FOR YOUR LOCAL PRODUCTS</h1>
                                        <p>Enter your phone number to create an account</p>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col">
                                        <form className="needs-validation" onSubmit={e => onSubmit(e)}>
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
                                                type="submit" 
                                                className="btn btn-primary btn-lg w-100 mt-3" 
                                                disabled={!isPhoneValid}
                                            >Next</button>
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

const mapStateToProps = state =>({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(SignupPhone)