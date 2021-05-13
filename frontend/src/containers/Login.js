import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button } from "react-bootstrap";
import { connect } from 'react-redux';

import Alert from '../components/Alert';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    if (isAuthenticated)
        return <Redirect to="/" />;

    return (
        <>
            <Alert />

            <div className="outer">
                <div className="inner">
                <Container className="mt-4">
                    <div className="row justify-content-center">
                        <img src="images/logo1.png" alt="logo" />
                    </div>
                    <Form onSubmit={e => onSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={e => onChange(e)}
                                required
                            />
                        </Form.Group>

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
                    </Form>
                </Container>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);