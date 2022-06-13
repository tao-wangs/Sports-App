import React, { Component } from "react";
import { SportingEvent } from "./SportingEvent";
import { HostEventForm } from "./HostEventForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
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

    console.log(body);
    this.setState({ body });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/host" element={<HostEventForm />} />
            </Routes>
          </header>
        </div>
      </Router>
    );
  }
}

// render() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {this.state.body ? (
//           <div>
//             {this.state.body.events.map(x => (
//               <SportingEvent data={x} />
//             ))}
//           </div>
//         ) : (
//           <button onClick={this.getEvents} type="button">
//             Find Event
//           </button>
//         )}
//         <HostEventForm />
//       </header>
//     </div>
//   );
// }

export default App;
