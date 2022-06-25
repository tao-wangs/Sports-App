import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Events from "../events/Events";
import "./MyEvents.css";

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: undefined,
      attending: true,
      refresh: false,
    };
  }

  setFilter = (event) => {
    this.setState({ attending: event.target.name === "attending" });
    this.getEvents();
  };

  getEvents = async () => {
    console.log("getting events");
    var path = "";
    if (this.state.attending) {
      path = "/get_attending";
    } else {
      path = "/get_hosting";
    }

    const response = await fetch(path);
    const body = await response.json();

    if (response.status !== 200) {
      return;
    }

    this.setState({
      events: body.events,
      refresh: !this.state.refresh,
    });
  };

  render() {
    console.log("myevents render");
    if (!document.cookie) {
      return <Navigate to="/login" />;
    }

    if (!this.state.events) {
      this.getEvents();
      return;
    }

    return (
      <div className="myevents">
        <h1>My Events</h1>
        <Button
          name="attending"
          className="secondary m-2 btn-lg"
          variant="light"
          onClick={this.setFilter}
        >
          Attending
        </Button>
        <Button
          name="hosting"
          className="secondary m-2 btn-lg"
          variant="light"
          onClick={this.setFilter}
        >
          Hosting
        </Button>
        <div>
          <Events events={this.state.events} refresh={this.state.refresh} />
        </div>
      </div>
    );
  }
}

export default MyEvents;
