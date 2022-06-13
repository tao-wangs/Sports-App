import React from "react";
import "./App.css";

class HostEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      date: "",
      time: "",
      description: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(
      this.state.name + this.state.location + this.state.date + this.state.time
    );
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };
    fetch("/post_event", params);
  }

  render() {
    return (
      <div classname="form-list">
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
                type="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Enter Time Here:
              <input
                name="time"
                type="time"
                value={this.state.time}
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

export { HostEventForm };
