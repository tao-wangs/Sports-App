import React from "react";
import Linkify from "react-linkify"

function SportingEvent(props) {
  const date = new Date(props.data.date);
  const enddate = new Date(props.data.enddate);
  return (
    <button type="button">
      <p>{props.data.name}</p>
      <p>{props.data.location}</p>
      <p>{date.toLocaleString()}</p>
      <p>{enddate.toLocaleString()}</p>
      <Linkify>{props.data.description}</Linkify>
    </button>
  );
}

export { SportingEvent };
