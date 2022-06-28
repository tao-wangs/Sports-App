import Linkify from "react-linkify";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Buffer } from "buffer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SportingEvent.css";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
    var img = undefined;
    if (this.props.images.length !== 0) {
      img = Buffer.from(this.props.images[0].data.data);
    }
    return (
      <div className="sportingEvent">
        {img ? (
          <img
            src={`data:${
              this.props.images[0].contentType
            };base64,${img.toString("base64")}`}
            alt=""
          />
        ) : (
          <img src="/placeholder.jpg" alt="" />
        )}
        <FavoriteIcon className="sportingEvent__heart" />
        <div className="sportingEvent__info">
          <div className="sportingEvent__infoTop">
            <Link to={`/events/${this.props.data._id}`}>
              <h3>{this.props.data.name}</h3>
            </Link>
            <p>{this.props.data.location}</p>
            <p>
              {new Date(this.props.data.date).toLocaleString() +
                " to " +
                new Date(this.props.data.enddate).toLocaleString()}
            </p>
            <p>
              <Linkify>{this.props.data.description}</Linkify>
            </p>
          </div>
          <div className="sportingEvent__infoBottom">
            <div className="sportingEvent__attending">
              <PeopleIcon />
              <p>
                <strong>{this.props.data.attendees.length} attending</strong>
              </p>
            </div>
            <div className="sportingEvent__rsvp">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { SportingEvent };
