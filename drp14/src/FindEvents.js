import React, { Component } from "react";
import Events from "./Events";

class FindEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      search: false,
      events: [],
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
      body: JSON.stringify(this.state),
    };
    const response = await fetch("/filter_events", params);
    const body = await response.json();
    console.log(body);
    this.setState({ events: body.events, search: true });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
          <input
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        {this.state.search ? <Events events={this.state.events} /> : <Events />}
      </div>
    );
  }
}

export default FindEvents;
