import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HostEventForm } from "./HostEventForm";
import { Home } from "./Home";
import { Events } from "./Events";
import SignUp from "./SignUp";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/host" element={<HostEventForm />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
