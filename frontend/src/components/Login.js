import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import Img from '../images/logo2.png'


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
            <div class="row justify-content-center">
                <img src = {Img} alt = "logo" />
            </div>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
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
                    />
                </Form.Group>
                <div class="row justify-content-center">
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                </div>
                <p className="forgot-password text-center">
                    Forgot <Link to="/reset_password">password?</Link>
                </p>
            </Form>
        </Container>
    );
}

export default Login;