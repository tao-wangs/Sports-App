import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Linkify from "react-linkify";
import "./EventInfo.css";
import { useParams } from "react-router-dom";
import getImages from "./imageGetter";
import { Buffer } from "buffer";

const EventInfo = () => {
  let { id } = useParams();

  const [event, setEvent] = useState(undefined);
  const [images, setImages] = useState([]);

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
