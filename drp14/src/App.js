import React, { Component } from "react";
import { SportingEvent } from "./SportingEvent";
import "./App.css";

class App extends Component {
  state = {
    body: null,
  };

  // fetching the GET route from the Express server which matches the GET route from server.js
  getEvents = async () => {
    const response = await fetch("/get_events");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    this.setState({ body });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.body ? (
            <div>
              <SportingEvent data={this.state.body.events[0]} />
              <SportingEvent data={this.state.body.events[1]} />
              <SportingEvent data={this.state.body.events[2]} />
              <SportingEvent data={this.state.body.events[3]} />
            </div>
          ) : (
            <button onClick={this.getEvents} type="button">
              Find Event
            </button>
          )}
        </header>
      </div>
    );
  }
}

export default App;
