import React, { Component } from "react";
import Events from "./Events";

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
      <div>
        <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
          <input
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
            className="form-control mr-sm-2 m-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
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
