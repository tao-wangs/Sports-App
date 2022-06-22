import React, { Component } from "react";
import { SportingEvent } from "./SportingEvent";
import LogIn from "../auth/LogIn";
import "./Events.css";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: null,
      filter: "",
      mapped: false,
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

  mapImages = async (events) => {
    var mappedEvents = await Promise.all(
      events.map(async (event) => {
        event.pictures = await this.getImages(event);
        return event;
      })
    );
    this.setState({ mapped: true });

    return mappedEvents;
  };

  setEvents = async (events) => {
    const mappedEvents = await this.mapImages(events);
    this.setState({
      body: mappedEvents,
      filter: this.props.filter,
    });
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
      return;
    }

    this.setState({
      body: await this.mapImages(body.events),
      filter: this.props.filter,
    });
  };

  render() {
    if (!this.state.body || this.props.filter !== this.state.filter) {
      if (this.props.events) {
        this.setEvents(this.props.events);
      } else {
        this.getEvents(this.props.filter);
      }
    }

    return this.state.body ? (
      <div className="event-grid">
        <p>{this.state.body.length} events found</p>
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
    ) : document.cookie || !this.props.filter ? (
      <p>Fetching events</p>
    ) : (
      <div>
        <LogIn />
      </div>
    );
  }
}

export default Events;
