import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Img from '../images/logo.png'

export default class Login extends Component {
  render() {
    return (
      <Container>
        <div class="row justify-content-center">
            <img src = {Img} alt = "logo" />
        </div>
      <form>
        <div className="form-group">
            <label>Phone Number</label>
            <input type="Phone Number" className="form-control" />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" />
        </div>

        <div className="form-group">
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
        <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
        </p>
      </form>
      </Container>
    );
  }
}