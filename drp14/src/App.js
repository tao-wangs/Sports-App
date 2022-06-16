import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HostEventForm from "./HostEventForm";
import Home from "./Home";
import Events from "./Events";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import MyEvents from "./MyEvents";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
          <main style={{minHeight: "95vh"}}>
            <Router>
              <Header />
              <div className="App">
                <header className="App-header">
                    <Routes>
                      <Route path="/" exact element={<Home />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/host" element={<HostEventForm />} />
                      <Route path="/myevents" element={<MyEvents filter="" />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/login" element={<LogIn />} />
                      <Route
                        path="/myevents/attending"
                        element={<MyEvents filter="attending" />}
                      />
                      <Route
                        path="/myevents/hosting"
                        element={<MyEvents filter="hosting" />}
                      />
                    </Routes>
                  </header>
              </div>
            </Router>
          </main>
        <Footer />
      </div>
    );
  }
}

export default App;
