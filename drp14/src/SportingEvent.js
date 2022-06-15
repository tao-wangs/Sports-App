import React, { Component } from "react";
import {Button} from "react-bootstrap"

class SportingEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data._id,
      name: props.data.name,
      location: props.data.location,
      date: new Date(props.data.date),
      duration: props.data.duration,
      description: props.data.description,
    };

    this.handleRSVP = this.handleRSVP.bind(this);
  }

  async handleRSVP(event) {
    event.preventDefault();
    const state = {
      event: this.state.id,
      user: document.cookie
    };
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    };
    const response = await fetch("get_user_id", params);
    const body = await response.json();
    if (body.user!== 200) {
      alert(body.message);
      return;
    }
    state.user = body.user;
    params.body = JSON.stringify(state);

    const rsvpResponse = await fetch("post_rsvp", params);
    const rsvpBody = await rsvpResponse.json();
    alert(body.message);
  }

  render() {
    return (
      <Button className="secondary" type="button">
        <p>{this.state.name}</p>
        <p>{this.state.location}</p>
        <p>{this.state.date.toLocaleString()}</p>
        <p>{this.state.duration}</p>
        <p>{this.state.description}</p>
        <Button type="button" onClick={this.handleRSVP}>RSVP</Button>
      </Button>
    );
  }
}

export { SportingEvent };
