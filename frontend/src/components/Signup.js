import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { connect } from 'react-redux';

import { signup } from '../actions/auth';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        phone_number: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: ''
    });

    const { email, phone_number, first_name, last_name, password, re_password } = formData;

    const onPhoneChange = e => {
        const re = /^[0-9\b]+$/;

        if (e.target.value === '' || re.test(e.target.value)) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            let phone = '+63' + phone_number;
            signup(email, phone, first_name, last_name, password, re_password);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/" />
    }

    if (accountCreated) {
        return <Redirect to="/login" />
    }

    return (
        <Container className="mt-4">
            <Form onSubmit={e => onSubmit(e)}>
                Sign Up
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
                    <Form.Label>Phone</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>+63</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            type="text"
                            name="phone_number"
                            id="phone_number"
                            maxLength="10" 
                            value={phone_number}
                            onChange={e => onPhoneChange(e)}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={last_name}
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
                    <Form.Label>Re-type Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="re_password"
                        id="re_password"
                        value={re_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" id="terms" label="Accept terms & agreements." />
                    <Link to="/login">Read here</Link>.
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign up
                </Button>
                <p>Already have an account? <Link to="/login">Log In</Link>.</p>
            </Form>
        </Container>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);