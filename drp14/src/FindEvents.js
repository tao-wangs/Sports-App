import React, { Component } from "react";
import Events from "./Events";

class FindEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    // event.preventDefault();
    // const params = {};
    // const response = await fetch("/filter_events", params);
    // const body = await response.json();
  }

  render() {
    return (
      <div>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <Events />
      </div>
    );
  }
}

export default FindEvents;
