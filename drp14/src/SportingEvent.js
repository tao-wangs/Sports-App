import Linkify from "react-linkify";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Buffer } from "buffer";
import "bootstrap/dist/css/bootstrap.min.css";

class SportingEvent extends Component {
  constructor(props) {
    super(props);
    this.handleRSVP = this.handleRSVP.bind(this);
  }

  async handleRSVP(event) {
    event.preventDefault();
    const state = {
      event: this.props.data._id,
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
      <Button className="btn btn-dark m-3" type="button">
        <p>{this.props.data.name}</p>
        <p>{this.props.data.location}</p>
        <p>{new Date(this.props.data.date).toLocaleString()}</p>
        <p>{new Date(this.props.data.enddate).toLocaleString()}</p>
        <p>
          <Linkify>{this.props.data.description}</Linkify>
        </p>
        {this.props.data.pictures.map((x) => {
          const img = Buffer.from(x.data.data);
          return (
            <img
              src={`data:${x.contentType};base64,${img.toString("base64")}`}
              alt=""
            />
          );
        })}

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
