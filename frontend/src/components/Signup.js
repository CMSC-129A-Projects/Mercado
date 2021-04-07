import React from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import Img from '../images/logo.png'

export default function Signup() {
    const history = useHistory();

    // Object.freeze() prevents data changes after committing 
    const initialFormData = Object.freeze({
        phone_number: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // trim() Trims any whitespaces 
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handlePhoneFieldChange = (e) => {
        const re = /^[0-9\b]+$/;

        // If value is not blank, test using regex
        if (e.target.value === '' || re.test(e.target.value)) {
            updateFormData({
                ...formData,
                // trim() Trims any whitespaces 
                [e.target.name]: e.target.value.trim(),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance.post(`users/register/`, {
            phone_number: formData.phone_number,
            first_name: formData.first_name,
            
        })
    };

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
                            onChange={handlePhoneFieldChange}
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