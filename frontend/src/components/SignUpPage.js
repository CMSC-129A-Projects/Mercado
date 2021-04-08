import React from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import Img from '../images/logo.png'

function SignUpPage() {
    const [state, setState] = React.useState({
        phone_number: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: '',
    });

    function handleChange(e) {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    function onSubmit(e) {
        
    }

    return (
        <Container>
            <Form>
                {Img}
                <h3>Sign up</h3>
                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>+63</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            required={true}
                            maxLength="10"
                            value={state.phone_number}
                            onChange={handleChange}
                            type="text" 
                            id="phoneNumber" 
                            name="phone_number"
                            placeholder="Phone"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        required={true}
                        value={state.first_name}
                        onChange={handleChange}
                        type="text"
                        id="firstName" 
                        name="first_name" 
                        placeholder="First Name"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        required={true}
                        value={state.last_name}
                        onChange={handleChange}
                        type="text"
                        id="lastName" 
                        name="last_name" 
                        placeholder="Last Name"
                    />
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

                <Form.Group>
                    <Form.Label>Re-type Password</Form.Label>
                    <Form.Control 
                        required={true}
                        value={state.re_password}
                        onChange={handleChange}
                        type="password"
                        id="rePassword" 
                        name="re_password" 
                        placeholder="Re-type Password"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={onSubmit}>
                    Sign in
                </Button>
            </Form>
        </Container>
    );
}

export default SignUpPage;