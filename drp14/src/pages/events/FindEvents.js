import React, { Component } from "react";
import Events from "./Events";
import "./FindEvents.css";

class FindEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      search: false,
      events: [],
      toggle: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: this.state.query }),
    };

    const response = await fetch("/filter_events", params);
    const body = await response.json();
    this.setState({
      events: body.events,
      search: true,
      toggle: !this.state.toggle,
    });
  }

  render() {
    return (
      <div className="findEventsPage">
        <div className="findEventsPage__info">
          <h1>Events</h1>
          <form onSubmit={this.handleSubmit} className="searchBar">
            <input
              name="query"
              value={this.state.query}
              onChange={this.handleChange}
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        {this.state.search ? (
          <Events events={this.state.events} filter={this.state.toggle} />
        ) : (
          <Events />
        )}
      </div>
    );
  }
}

export default FindEvents;
