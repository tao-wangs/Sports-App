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
        <Link to={"/login"}>
          <button type="button">Log In</button>
        </Link>
        <Link to={"/signup"}>
          <button type="button">Sign Up</button>
        </Link>
      </div>
    );
  }
}

export default Home;
