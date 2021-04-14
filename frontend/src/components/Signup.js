import React from 'react';
import { Container, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import Img from '../images/logo1.png'


export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {
                'email_address': '',
                'first_name': '',
                'last_name': '',
                'password': '',
                're_password': ''
            },
            errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleEmailField = this.handleEmailField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let input = this.state.input;
        input[e.target.name] = e.target.value;

        this.setState({ input });
    }

    handleEmailField(e) {
        let input = this.state.input;
        input[e.target.name] = e.target.value;

        const re = /^[0-9\b]+$/;

        // If value is not blank, test using regex
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ input })
        }
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input['email_address']) {
            errors['email_address'] = "Email is required.";
            isValid = false;
        } else {
            const phone_regex = /^(9)\d{9}$/;
            if (!phone_regex.test(input['email_address'])) {
                errors['email_address'] = "Email not valid.";
                isValid = false;
            }
        }

        if (!input['first_name']) {
            errors['first_name'] = "First name is required.";
            isValid = false;
        }

        if (!input['last_name']) {
            errors['last_name'] = "Last name is required.";
            isValid = false;
        }

        if (!input['password']) {
            errors['password'] = "Password is required.";
            isValid = false;
        }

        if (!input['re_password']) {
            errors['re_password'] = "Confirm password.";
            isValid = false;
        }

        if (input['password'] !== input['re_password']) {
            errors['re_password'] = "Passwords don't match.";
            isValid = false;
        }

        this.setState({
            errors: errors,
        });

        return isValid;
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validate()) {
            console.log(this.state.input)

            axiosInstance.post(`users/register/`, {
                email_address: this.state.input['email_address'],
                first_name: this.state.input['first_name'],
                last_name: this.state.input['last_name'],
                password: this.state.input['password'],
            }).then((res) => {
                console.log(res);
                console.log(res.data);
            });   
        }
    }

    render() {
        return (
            <Container className="mt-4">
                    <div class="row justify-content-center">
                        <img src = {Img} alt = "logo" />
                    </div>
                <Form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                required
                                id="email_address" 
                                name="email_address"
                                value={this.state.input.email_address}
                                onChange={this.handleEmailField}
                                type="text" 
                            />
                        </InputGroup>
                        <Form.Text className="text-danger">{this.state.errors.email_address}</Form.Text>
                    </Form.Group>
                    <Row>
                    <Col>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            required
                            type="text"
                            id="first_name" 
                            name="first_name" 
                            value={this.state.input.first_name}
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-danger">{this.state.errors.first_name}</Form.Text>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            required
                            type="text"
                            id="last_name" 
                            name="last_name" 
                            value={this.state.input.last_name}
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-danger">{this.state.errors.last_name}</Form.Text>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            required
                            type="password"
                            id="password" 
                            name="password" 
                            value={this.state.input.password}
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-danger">{this.state.errors.password}</Form.Text>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Re-type Password</Form.Label>
                        <Form.Control 
                            required
                            type="password"
                            id="re_password" 
                            name="re_password" 
                            value={this.state.input.re_password}
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-danger">{this.state.errors.re_password}</Form.Text>
                    </Form.Group>
                    </Col>
                    </Row>
                    <div class="row justify-content-center">
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                            Sign up
                        </Button>
                    </div>
                    <p className="forgot-password text-center">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    
                </Form>
            </Container>
        );
    }
}