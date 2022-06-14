import React, { Component } from "react";
import { Navigate } from "react-router-dom";
class HostEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      date: "",
      time: "",
      description: "",
      submit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };
    fetch("/post_event", params);
    this.setState({ submit: true });
  }

  render() {
    return this.state.submit ? (
      <Navigate to="/" />
    ) : (
      <div className="form-list">
        <form onSubmit={this.handleSubmit}>
          <li>
            <label>
              Enter Name Here:
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Enter Location Here:
              <input
                name="location"
                type="text"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Enter Date Here:
              <input
                name="date"
                type="datetime-local"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Enter Description Here:
              <textarea
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
          </li>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default HostEventForm;
