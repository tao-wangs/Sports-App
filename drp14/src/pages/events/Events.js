import React, { Component } from "react";
import { SportingEvent } from "./SportingEvent";
import "./Events.css";
//import { Navigate } from "react-router-dom";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: undefined,
      refresh: undefined,
    };
  }

  getImages = async (event) => {
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: event.images }),
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

    return mappedEvents;
  };

  setEvents = async (events) => {
    console.log("set events");
    const mappedEvents = await this.mapImages(events);
    this.setState({
      body: mappedEvents,
      refresh: this.props.refresh,
    });
  };

  render() {
    if (!this.state.body || this.props.refresh !== this.state.refresh) {
      this.setEvents(this.props.events);
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
      <p />
    );
  }
}

export default Events;
