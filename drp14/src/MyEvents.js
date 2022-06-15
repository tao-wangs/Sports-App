import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import { Col } from "react-bootstrap";

class MyEvents extends Component {
  state = {};

  render() {
    return (
      <Router>
        <div>
          <h1>My Events</h1>
          <Col>Hosting Events</Col>

          <Col>RSVP Events</Col>
        </div>
      </Router>
    );
  }
}

export default MyEvents;
