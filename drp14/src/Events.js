import React, { Component } from "react";
import { SportingEvent } from "./SportingEvent";

class Events extends Component {
  state = {
    body: null,
  };

  // fetching the GET route from the Express server which matches the GET route from server.js
  getEvents = async () => {
    const response = await fetch("/get_events");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    console.log(body);
    this.setState({ body });
  };

  render() {
    if (!this.state.body) this.getEvents();
    return this.state.body ? (
      <div className="event-grid">
        {this.state.body.events.map((x) => (
          <SportingEvent data={x} />
        ))}
      </div>
    ) : (
      <p>Fetching events</p>
    );
  }
}

export default Events;
