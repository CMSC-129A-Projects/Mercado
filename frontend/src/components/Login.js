import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Form, InputGroup, Button } from "react-bootstrap";

function Login() {
    const [state, setState] = React.useState({
        phone_number: '',
        password: '',
    });

    function handlePhoneFieldChange(e) {
        const re = /^[0-9\b]+$/;

        // If value is not blank, test using regex
        if (e.target.value === '' || re.test(e.target.value)) {
            setState({ ...state, [e.target.name]: e.target.value })
        }
    }

    function handleChange(e) {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    function onSubmit(e) {
        
    }

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <h3>Log in</h3>
                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>+63</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            required={true}
                            maxLength="10"
                            value={'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             +63'+state.phone_number}
                            onChange={handlePhoneFieldChange}
                            type="text" 
                            id="phoneNumber" 
                            name="phone_number"
                            placeholder="Phone"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required={true}
                        value={state.password}
                        onChange={handleChange}
                        type="password"
                        id="password" 
                        name="password" 
                        placeholder="Password"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log in
                </Button>
                <p>Forgot <Link to="/reset_password">password?</Link></p>
            </Form>
        </Container>
    );
}

export default Login;