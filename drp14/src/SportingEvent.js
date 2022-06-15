import Linkify from "react-linkify";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class SportingEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data._id,
      name: props.data.name,
      location: props.data.location,
      date: new Date(props.data.date),
      enddate: new Date(props.data.enddate),
      description: props.data.description,
    };

    this.handleRSVP = this.handleRSVP.bind(this);
  }

  async handleRSVP(event) {
    event.preventDefault();
    const state = {
      event: this.state.id,
      user: document.cookie,
    };
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    };
    const response = await fetch("/get_user_id", params);
    const body = await response.json();
    if (!body.user) {
      alert(body.message);
      return;
    }
    state.user = body.user;
    params.body = JSON.stringify(state);

    const rsvpResponse = await fetch("/post_rsvp", params);
    const rsvpBody = await rsvpResponse.json();
    alert(rsvpBody.message);
  }

  render() {
    return (
      <Button className="btn btn-dark" type="button">
        <p>{this.state.name}</p>
        <p>{this.state.location}</p>
        <p>{this.state.date.toLocaleString()}</p>
        <p>{this.state.enddate.toLocaleString()}</p>
        <p>
          <Linkify>{this.state.description}</Linkify>
        </p>
        {this.props.rsvp === "hidden" ? (
          <p></p>
        ) : (
          <Button
            className="btn btn-secondary"
            type="button"
            onClick={this.handleRSVP}
          >
            RSVP
          </Button>
        )}
      </Button>
    );
  }
}

export { SportingEvent };
