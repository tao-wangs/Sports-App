import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Row } from "react-bootstrap";

class HostEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      sport: "",
      location: "",
      date: "",
      enddate: "",
      description: "",
      submit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };

    const response = await fetch("/post_event", params);
    const body = await response.json();
    if (response.status !== 200) {
      alert(body.message);
      return;
    }

    this.setState({ submit: true });
  }

  render() {
    return this.state.submit ? (
      <Navigate to="/" />
    ) : (
      <div className="form-list">
        {
          <form onSubmit={this.handleSubmit}>
            <Row>
              <input
                className="form-control mr-sm-2 m-2"
                placeholder="Event Name"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Row>
            <Row>
              <input
                className="form-control mr-sm-2 m-2"
                placeholder="Sport"
                name="sport"
                type="text"
                value={this.state.sport}
                onChange={this.handleChange}
              />
            </Row>
            <Row>
              <input
                className="form-control mr-sm-2 m-2"
                placeholder="Location"
                name="location"
                type="text"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </Row>
            <Row>
              <textarea
                className="form-control mr-sm-2 m-2"
                placeholder="Description"
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </Row>
            <label>Start Date</label>
            <Row>
              <input
                className="form-control mr-sm-2 m-2"
                placeholder="Start Date"
                name="date"
                type="datetime-local"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </Row>
            <label>End Date</label>
            <Row>
              <input
                className="form-control mr-sm-2 m-2"
                placeholder="End Date"
                name="enddate"
                type="datetime-local"
                value={this.state.enddate}
                onChange={this.handleChange}
              />
            </Row>
            <input type="submit" value="Submit" />
          </form>
        }
      </div>
    );
  }
}

export default HostEventForm;
