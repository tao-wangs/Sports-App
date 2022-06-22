import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogIn from "../auth/LogIn";
import Events from "../events/Events";
import "./MyEvents.css";

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: this.props.filter, filtered: true };
    switch (this.props.filter) {
      case "attending":
        break;
      case "hosting":
        break;
      default:
        this.state.filtered = false;
        break;
    }

    this.setFilter = this.setFilter.bind(this);
  }

  setFilter = (event) => {
    this.setState({ filter: event.target.name, filtered: true });
  };

  render() {
    return (
      <div className="myevents">
        <h1>My Events</h1>
        <Link to="/myevents/attending">
          <Button
            name="attending"
            className="secondary m-2 btn-lg"
            variant="light"
            onClick={this.setFilter}
          >
            Attending
          </Button>
        </Link>
        <Link to="/myevents/hosting">
          <Button
            name="hosting"
            className="secondary m-2 btn-lg"
            variant="light"
            onClick={this.setFilter}
          >
            Hosting
          </Button>
        </Link>
        {this.state.filtered ? (
          <div>
            <Events filter={this.state.filter} setFilter={this.setFilter} />
          </div>
        ) : !document.cookie ? (
          <div>
            <LogIn />
          </div>
        ) : (
          <p />
        )}
      </div>
    );
  }
}

export default MyEvents;
