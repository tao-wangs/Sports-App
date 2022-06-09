import React, { Component } from "react";
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
          <button onClick={this.getEvents} type="button">
            {this.state.body ? this.state.body.event1 : "Find Events"}
          </button>
        </header>
      </div>
    );
  }
}

export default App;
