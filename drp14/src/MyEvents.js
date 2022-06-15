import React, { Component } from "react";
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
          <button name="attending" onClick={this.setFilter}>
            Attending
          </button>
        </Link>
        <Link to="/myevents/hosting">
          <button name="hosting" onClick={this.setFilter}>
            Hosting
          </button>
        </Link>
        {this.state.filtered ? (
          <div>
            <h1>{this.state.filter}</h1>
            <Events filter={this.state.filter} setFilter={this.setFilter} />
          </div>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}

export default MyEvents;
