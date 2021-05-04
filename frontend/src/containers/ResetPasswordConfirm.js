import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';

import { reset_password_confirm } from '../actions/auth';

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to="/" />
    }

    return (
        <Container className="mt-4">
            <Form onSubmit={e => onSubmit(e)}>
                Reset Password
                <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="new_password"
                        id="new_password"
                        value={new_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Re-type New Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="re_new_password"
                        id="re_new_password"
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </Form.Group>
    
                <Button variant="primary" type="submit">
                    Reset Password
                </Button>
            </Form>
        </Container>
    );
};



export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);