import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Linkify from "react-linkify";
import "./EventInfo.css";
import { useParams } from "react-router-dom";
import getImages from "./imageGetter";
import { Buffer } from "buffer";

import {Accordion} from "react-bootstrap";

const EventInfo = () => {
  let { id } = useParams();

  const [event, setEvent] = useState(undefined);
  const [images, setImages] = useState([]);

  const handleRSVP = async () => {
    const state = {
      event: event._id,
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
  };

  useEffect(() => {
    async function getEvent() {
      const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      };
      const response = await fetch("/get_event_id", params);
      const body = await response.json();
      if (response.status !== 200) {
        alert(body.message);
      }
      setEvent(body.event);
      setImages(await getImages(body.event));
    }
    getEvent();
  }, [id]);

  if (event !== undefined) {
    return (
      <div className="eventInfoContainer">
        <div className="eventInfoWrapper">
          <h1 className="eventTitle">{event.name}</h1>
          <div className="eventAddress">
            <LocationOnIcon />
            <span>{event.location}</span>
          </div>
          <span className="eventCategory">{event.sport}</span>
          <div className="eventImages">
            {/* Map over list of images and render the following: */}
            {images.map((x) => {
              const img = Buffer.from(x.data.data);
              return (
                <div className="eventImage__wrapper">
                  <img
                    className="eventImage"
                    src={`data:${x.contentType};base64,${img.toString(
                      "base64"
                    )}`}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
          <div className="eventDetails">
            <div className="eventDetailsText">
              <h3>Event Details</h3>
              <Linkify>{event.description}</Linkify>
            </div>
            <div className="eventDetailsRSVP">
              <button onClick={handleRSVP}>RSVP</button>
            </div>
          </div>
          <Accordion className="accordion" defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>View Event Location</Accordion.Header>
              <Accordion.Body>
              <div className="map">
                <iframe
                  title="map"
                  width="600"
                  height="450"
                  loading="lazy"
                  allowfullscreen
                  referrerpolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDlY0nBcpQ2hymqsByE8tK7uYKaRPALjXs&q=${event.location}`}
                ></iframe>
              </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
};

export default EventInfo;
