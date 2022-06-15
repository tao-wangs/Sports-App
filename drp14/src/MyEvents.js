import React, { Component } from 'react';
import { Column } from "react-bootstrap";

class MyEvents extends Component {
  state = {  } 
  
  render() { 
    <div>
      <Header>My Events</Header>
      <Column>
        Hosting Events
      </Column>
      
      <Column>
        RSVP Events
      </Column>
    </div>
  };
}

export default MyEvents;