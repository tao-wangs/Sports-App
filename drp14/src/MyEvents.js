import React, { Component } from "react";
import {Button} from "react-bootstrap"
import { Link } from "react-router-dom";
import Events from "./Events";

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: this.props.filter, filtered: true, header: "" };
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

    this.setFilter = this.setFilter.bind(this);
  }

  setFilter = (event) => {
    this.setState({ filter: event.target.name, filtered: true });
  };

  render() {
    return (
      <div>
        <Link to="/myevents/attending">
          <Button name="attending" className="secondary m-2 btn-lg" variant="light" onClick={this.setFilter}>
            Attending
          </Button>
        </Link>
        <Link to="/myevents/hosting">
          <Button name="hosting" className="secondary m-2 btn-lg" variant="light" onClick={this.setFilter}>
            Hosting
          </Button>
        </Link>
        {this.state.filtered ? (
          <div>
            <h1>{this.state.filter}</h1>
            <Events filter={this.state.filter} setFilter={this.setFilter} />
          </div>
        ) : (
          <p>{"No Events " + this.state.filter}</p>
        )}
      </div>
    );
  }
}

export default MyEvents;
