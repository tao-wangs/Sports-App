import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { sha256 } from "crypto-hash";
import { Row } from "react-bootstrap";
import "./Login.css"

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    var hashedPass = await sha256(this.state.password);
    var user = {
      email: this.state.email,
      password: hashedPass,
    };

    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    const response = await fetch("/post_login", params);
    const body = await response.json();

    if (response.status !== 200) {
      alert(body.message);
      return;
    }
    this.setState({ submit: true });
  }

  render() {
    return this.state.submit ? (
      <Navigate to="/" />
    ) : (
      <div className="login">
        <div className="login__box">
          <h1>Log In</h1>
          <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
            <Row>
              <input
                className="form-control mr-sm-2 m-2"
                placeholder="Email"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Row>
            <Row>
              <input
                className="form-control mr-sm-2 m-2"
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Row>
            <div className='help'>
            <p>Need an account?</p>  
            <p>
              <Link to="/signup">
                Sign Up
              </Link>
            </p>  
            </div>
            <input 
              variant="outlined" 
              className="submit-button" 
              type="submit" 
              value="Log In" />
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
