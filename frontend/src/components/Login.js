import React from "react";
import { Link } from 'react-router-dom';
import { Container, Form, InputGroup, Button } from "react-bootstrap";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            phone_number: '',
            password: '',
            errors: {},
        };

        this.handlePhoneField = this.handlePhoneField.bind(this);
        this.handlePasswordField = this.handlePasswordField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePhoneField(e) {
        const re = /^[0-9\b]+$/;

        // If value is not blank, test using regex
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ phone_number: e.target.value })
        }
    }

    handlePasswordField(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <Container className="mt-4">
                <Form>
                    <h3>Log in</h3>
                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text>+63</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                required
                                maxLength="10"
                                type="text" 
                                id="phone_number" 
                                name="phone_number"
                                value={this.state.phone_number}
                                onChange={this.handlePhoneField}
                                placeholder="Phone"
                            />
                        </InputGroup>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            required
                            type="password"
                            id="password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.handlePasswordField}
                            placeholder="Password"
                        />
                    </Form.Group>
    
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Log in
                    </Button>
                    <p>Forgot <Link to="/reset_password">password?</Link></p>
                </Form>
            </Container>
        );
    }
}