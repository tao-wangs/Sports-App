import React from "react";
import {Button} from "react-bootstrap"

function SportingEvent(props) {
  const date = new Date(props.data.date);
  return (
    <Button className="secondary" type="button">
      <p>{props.data.name}</p>
      <p>{props.data.location}</p>
      <p>{date.toLocaleString()}</p>
      <p>{props.data.duration}</p>
      <p>{props.data.description}</p>
    </Button>
  );
}

export { SportingEvent };
