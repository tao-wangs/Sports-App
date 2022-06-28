import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Events from "../events/Events";
import "./MyEvents.css";

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this.getEvents({ target: { name: "attending" } });
  }

  getEvents = async (event) => {
    console.log("getting events");
    var path = "";
    if (event.target.name === "attending") {
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
    });
  };

  render() {
    console.log("myevents render");
    if (!document.cookie) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="myevents">
        <h1>My Events</h1>
        <Button
          name="attending"
          className="secondary m-2 btn-lg"
          variant="light"
          onClick={this.getEvents}
        >
          Attending
        </Button>
        <Button
          name="hosting"
          className="secondary m-2 btn-lg"
          variant="light"
          onClick={this.getEvents}
        >
          Hosting
        </Button>
        <div>
          <Events events={this.state.events} />
        </div>
      </div>
    );
  }
}

export default MyEvents;
