import React, { Component } from "react";
import { SportingEvent } from "./SportingEvent";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: null,
      filter: "",
    };
  }

  getImages = async (event) => {
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: event }),
    };

    const response = await fetch("/get_images", params);
    const body = await response.json();

    if (response.status !== 200) {
      alert(body.message);
      return;
    }
    return body.images;
  };

  // fetching the GET route from the Express server which matches the GET route from server.js
  getEvents = async () => {
    var path = "";
    switch (this.props.filter) {
      case "attending":
        path = "/get_attending";
        break;
      case "hosting":
        path = "/get_hosting";
        break;
      default:
        path = "/get_events";
        break;
    }

    const response = await fetch(path);
    const body = await response.json();

    if (response.status !== 200) {
      alert(body.message);
      return;
    }

    var events = await Promise.all(
      body.events.map(async (event) => {
        event.pictures = await this.getImages(event);
        return event;
      })
    );

    this.setState({ body: events, filter: this.props.filter });
  };

  render() {
    if (!this.props.events) {
      if (!this.state.body || this.props.filter !== this.state.filter) {
        this.getEvents(this.props.filter);
      }

      return this.state.body ? (
        <div className="event-grid">
          {this.state.body.map((x) => (
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
    } else {
      return (
        <div className="event-grid">
          {this.props.events.map((x) => (
            <SportingEvent filter={this.props.filter} images={[]} data={x} />
          ))}
        </div>
      );
    }
  }
}

export default Events;
