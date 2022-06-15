import React, { Component } from "react";
import { SportingEvent } from "./SportingEvent";

class Events extends Component {
  state = {
    body: null,
    filter: "",
  };

  // fetching the GET route from the Express server which matches the GET route from server.js
  getEvents = async () => {
    const response = await fetch("/get_events");
    const body = await response.json();

    if (response.status !== 200) {
      alert(body.message);
      return;
    }

    console.log(body);
    this.setState({ body: body, filter: "" });
  };

  getAttending = async () => {
    const response = await fetch("/get_attending");
    const body = await response.json();

    if (response.status !== 200) {
      alert(body.message);
      return;
    }

    this.setState({ body: body, filter: "attending" });
  };

  getHosting = async () => {
    const response = await fetch("/get_hosting");
    const body = await response.json();

    if (response.status !== 200) {
      alert(body.message);
      return;
    }

    this.setState({ body: body, filter: "hosting" });
  };

  render() {
    if (!this.state.body || this.props.filter !== this.state.filter) {
      switch (this.props.filter) {
        case "attending":
          this.getAttending();
          break;
        case "hosting":
          this.getHosting();
          break;
        default:
          this.getEvents();
          break;
      }
    }
    return this.state.body ? (
      <div>
        {this.state.body.events.map((x) => (
          <SportingEvent
            filter={this.props.filter}
            data={x}
            rsvp={
              this.props.filter === "attending" ||
              this.props.filter === "hosting"
                ? "hidden"
                : ""
            }
          />
        ))}
      </div>
    ) : (
      <p>Fetching events</p>
    );
  }
}

export default Events;
