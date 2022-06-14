import React, { Component } from "react";
import { Navigate } from "react-router-dom";

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

  handleSubmit(event) {
    event.preventDefault();
    if (!(this.state.password === this.state.confirmedPassword)) {
      alert("Passwords do not match!");
      return;
    }
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };

    fetch("/post_signup", params);
    this.setState({ submit: true });
  }

  render() {
    return this.state.submit ? (
      <Navigate to="/" />
    ) : (
      <div className="form-list">
        <form onSubmit={this.handleSubmit}>
          <li>
            <label>
              Enter email here:
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Enter password:
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Confirm password:
              <input
                name="confirmedPassword"
                type="password"
                value={this.state.confirmedPassword}
                onChange={this.handleChange}
              />
            </label>
          </li>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignUp;
