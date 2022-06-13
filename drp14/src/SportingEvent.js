import React from "react";

function SportingEvent(props) {
  const date = new Date(props.data.date);
  return (
    <button type="button">
      <p>{props.data.name}</p>
      <p>{props.data.location}</p>
      <p>{date.toUTCString()}</p>
      <p>{props.data.description}</p>
    </button>
  );
}

export { SportingEvent };
