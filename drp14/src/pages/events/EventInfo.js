import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Linkify from "react-linkify";
import "./EventInfo.css";
import { useParams } from "react-router-dom";

const EventInfo = () => {
  let { id } = useParams();

  const [event, setEvent] = useState(undefined);
  const [images, setImages] = useState([
    "/swimming1.jpg",
    "/swimming2.jpg",
    "/swimming3.jpg",
    "/swimming4.jpg",
    "/swimming6.jpg",
    "/swimming5.jpg",
  ]);

  useEffect(() => {
    console.log("use effect");
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
    }
    getEvent();
  }, [id]);

  if (event !== undefined) {
    console.log(event);
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
            {images.map((img) => (
              <div className="eventImage__wrapper">
                <img className="eventImage" src={img} alt="" />
              </div>
            ))}
          </div>
          <div className="eventDetails">
            <div className="eventDetailsText">
              <h3>Event Details</h3>
              <Linkify>{event.description}</Linkify>
            </div>
            <div className="eventDetailsRSVP">
              <button>RSVP</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
};

export default EventInfo;
