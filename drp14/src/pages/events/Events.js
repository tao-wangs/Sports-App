import React, { Component } from "react";
import { SportingEvent } from "./SportingEvent";
import "./Events.css";
import getImages from "./imageGetter";
//import { Navigate } from "react-router-dom";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      id: 0,
    };
  }

  mapImages = async (events) => {
    var mappedEvents = await Promise.all(
      events.map(async (event) => {
        return await getImages(event);
      })
    );

    return mappedEvents;
  };

  setEvents = async () => {
    const prevId = this.state.id + 1;
    this.setState({ id: prevId, images: [] });
    const images = await this.mapImages(this.props.events);
    if (this.state.id === prevId) {
      this.setState({
        images: images,
      });
    }
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
    return (
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
