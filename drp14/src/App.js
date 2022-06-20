import React, { Component } from "react";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./Home"

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Home/>
        <Footer/>
      </div>
        /* <main style={{ minHeight: "95vh" }}>
          <Router>
            <Header />
            <div className="App">
              <header className="App-header">
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
              </header>
            </div>
          </Router>
        </main>
        <Footer /> */
    );
  }
}

export default App;
