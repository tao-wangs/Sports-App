import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Events from "./Events";

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { filtered: true, header: "" };
    switch (this.props.filter) {
      case "attending":
        this.state.header = "Attending";
        break;
      case "hosting":
        this.state.header = "Hosting";
        break;
      default:
        this.state.filtered = false;
        break;
    }
  }

  render() {
    return this.state.filtered ? (
      <div>
        <h1>{this.state.header}</h1>
        <Col>
          <Events filter={this.props.filter} />
        </Col>
      </div>
    ) : (
      <div>
        <Link to="/myevents/attending">
          <button>Attending</button>
        </Link>
        <Link to="/myevents/hosting">
          <button>Hosting</button>
        </Link>
      </div>
    );
  }
}

export default MyEvents;
