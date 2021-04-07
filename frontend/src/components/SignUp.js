import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Img from '../images/logo.png'

export default class SignUp extends Component {
    render() {
        return (
            <Container>
                <div class="row justify-content-center">
                    <img src = {Img} alt = "logo" />
                </div>
            <form>
                <Row>
                <Col>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="phone number" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" />
                </div>
                </Col>
                <Col>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" />
                </div>
                </Col>
                </Row>
                
                <div class="row justify-content-center">
                    <button type="submit" class="btn btn-primary btn-block">Submit</button>
                </div>
                <p className="forgot-password text-center">
                    Already registered <a href="./components/Login.js">log in?</a>
                </p>
            </form>
            </Container>
        );
    }
}