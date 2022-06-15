import React, { Component } from "react";
import { SportingEvent } from "./SportingEvent";

class Events extends Component {
  state = {
    body: null,
    attending: null,
    hosting: null
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

  getAttending = async () => {
    const response = await fetch("get_attending");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    console.log(body);
    this.setState({attending: body});
  }

  getHosting = async () => {
    const response = await fetch("get_hosting");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    console.log(body);
    this.setState({hosting:body});
  }

  render() {
    if (!this.state.body) this.getEvents();
    return this.state.body ? (
      <div>
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
