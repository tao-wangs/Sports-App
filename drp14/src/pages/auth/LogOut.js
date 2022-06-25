import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import "./Login.css";

class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const sessionID = document.cookie.sessionID;

    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionID: sessionID }),
    };

    const response = await fetch("/post_logout", params);
    const body = await response.json();
    console.log(body.message);
    this.setState({ submit: true });
  }

  render() {
    return !this.state.submit ? (
      <div className="login">
        <Button className="submit-button" onClick={this.handleSubmit}>
          Log Out
        </Button>
      </div>
    ) : (
      <Navigate to="/" />
    );
  }
}

export default LogOut;
