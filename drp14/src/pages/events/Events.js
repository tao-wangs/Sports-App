import React, { Component } from "react";
import { SportingEvent } from "./SportingEvent";
import "./Events.css";
//import { Navigate } from "react-router-dom";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
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
        return await this.getImages(event);
      })
    );

    return mappedEvents;
  };

  setEvents = async () => {
    this.setState({
      images: await this.mapImages(this.props.events),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setEvents();
    }
  }

  componentDidMount() {
    this.setEvents();
  }

  render() {
    return(
      <div className="event-grid">
        <p>{this.props.events.length} events found</p>
        {this.props.events.map((x, i, _) => (
          <SportingEvent
            filter={this.props.filter}
            images={i < this.state.images.length ? this.state.images[i] : []}
            data={x}
            rsvp={this.props.rsvp}
          />
        ))}
      </div>
    );
  }
}

export default Events;
