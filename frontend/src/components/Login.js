import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button } from "react-bootstrap";
import { connect } from 'react-redux';

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

    if (isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <Container className="mt-4">
            <Form onSubmit={e => onSubmit(e)}>
                Log in
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
                <Form.Group>
                    <Form.Check type="checkbox" id="terms" label="Accept terms & agreements." />
                    <Link to="/signup">Read here</Link>.
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log in
                </Button>
                <p>Forgot password? Click <Link to="/reset_password">here</Link>.</p>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link>.</p>
            </Form>
        </Container>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);