import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';

import { reset_password } from '../actions/auth';

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to="/" />
    }

    return (
        <Container className="mt-4">
            <Form onSubmit={e => onSubmit(e)}>
                Password Reset Request
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
    
                <Button variant="primary" type="submit">
                    Request
                </Button>
            </Form>
        </Container>
    );
};

export default connect(null, { reset_password })(ResetPassword);