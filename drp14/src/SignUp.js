import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { sha256 } from "crypto-hash";
import { Row } from "react-bootstrap";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmedPassword: "",
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
    if (!(this.state.password === this.state.confirmedPassword)) {
      alert("Passwords do not match!");
      return;
    }

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

    const response = await fetch("/get_user", params);
    const body = await response.json();
    if (body.users > 0) {
      alert("User already exists for that email!");
      return;
    }

    fetch("/post_signup", params);
    this.setState({ submit: true });
  }

  render() {
    return this.state.submit ? (
      <Navigate to="/" />
    ) : (
      <div className="form-list">
        <form onSubmit={this.handleSubmit}>
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
          <Row>
            <input
              className="form-control mr-sm-2 m-2"
              placeholder="Confirm Password"
              name="confirmedPassword"
              type="password"
              value={this.state.confirmedPassword}
              onChange={this.handleChange}
            />
          </Row>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignUp;
