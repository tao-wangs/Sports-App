import React from "react";

function SportingEvent(props) {
  const text = props.data.split("\n");
  return (
    <button type="button">
      <p>{text[0]}</p>
      <p>{text[1]}</p>
      <p>{text[2]}</p>
    </button>
  );
}

export { SportingEvent };
