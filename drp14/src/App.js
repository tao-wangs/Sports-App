import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./Home"

import FindEvents from "./FindEvents"
import HostEventForm from "./HostEventForm"
import SignUp from "./SignUp"
import LogIn from "./LogIn"
import MyEvents from "./MyEvents"
class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Header/>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/events" element={<FindEvents />} />
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
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;
