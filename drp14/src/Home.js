import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <Link to={"/events"}>
          <button type="button">Find Event</button>
        </Link>
        <Link to={"/host"}>
          <button type="button">Host Event</button>
        </Link>
      </div>
    );
  }
}

export { Home };
