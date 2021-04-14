import React from 'react';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';


export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {
                'email': '',
                'phone_number': '',
                'first_name': '',
                'last_name': '',
                'password': '',
                're_password': ''
            },
            errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePhoneField = this.handlePhoneField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let input = this.state.input;
        input[e.target.name] = e.target.value;

        this.setState({ input });
    }

    handlePhoneField(e) {
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

        if (!input['email']) {
            errors['email'] = "Email is required.";
            isValid = false;
        } else {
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!re.test(String(input['email'].toLowerCase()))) {
                errors['email'] = "Email is not valid."
                isValid = false;
            }
        }

        if (!input['phone_number']) {
            errors['phone_number'] = "Phone number is required.";
            isValid = false;
        } else {
            const phone_regex = /^(9)\d{9}$/;
            if (!phone_regex.test(input['phone_number'])) {
                errors['phone_number'] = "Phone number not valid.";
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

            let phone_number = '+63' + this.state.input['phone_number'];
            axiosInstance.post(`users/`, {
                email: this.state.input['email'],
                phone_number: phone_number,
                first_name: this.state.input['first_name'],
                last_name: this.state.input['last_name'],
                password: this.state.input['password'],
                re_password: this.state.input['re_password'],
            }).then((res) => {
                console.log(res);
                console.log(res.data);
            });   
        }
    }

    render() {
        return (
            <Container className="mt-4">
                <Form>
                    <h3>Sign up</h3>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            required
                            type="email"
                            id="email" 
                            name="email" 
                            value={this.state.input.email}
                            onChange={this.handleChange}
                            placeholder="Email"
                        />
                        <Form.Text className="text-danger">{this.state.errors.email}</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text>+63</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                required
                                maxLength="10"
                                id="phone_number" 
                                name="phone_number"
                                value={this.state.input.phone_number}
                                onChange={this.handlePhoneField}
                                type="text" 
                                placeholder="Phone"
                            />
                        </InputGroup>
                        <Form.Text className="text-danger">{this.state.errors.phone_number}</Form.Text>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            required
                            type="text"
                            id="first_name" 
                            name="first_name" 
                            value={this.state.input.first_name}
                            onChange={this.handleChange}
                            placeholder="First Name"
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
                            placeholder="Last Name"
                        />
                        <Form.Text className="text-danger">{this.state.errors.last_name}</Form.Text>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            required
                            type="password"
                            id="password" 
                            name="password" 
                            value={this.state.input.password}
                            onChange={this.handleChange}
                            placeholder="Password"
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
                            placeholder="Re-type Password"
                        />
                        <Form.Text className="text-danger">{this.state.errors.re_password}</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Check type="checkbox" id="terms" label="Accept terms & agreements." />
                        <Link to="/">Read here</Link>.
                    </Form.Group>
    
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Sign up
                    </Button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </Form>
            </Container>
        );
    }
}