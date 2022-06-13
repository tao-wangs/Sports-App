import React from "react";

class HostEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      date: '',
      time: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.name + this.state.location + this.state.date + this.state.time);
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }
    fetch("/post_event", params);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter Name Here:
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter Location Here:
          <input
            name="location"
            type="text"
            value={this.state.location}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter Date Here:
          <input
            name="date"
            type="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter Time Here:
          <input
            name="time"
            type="text"
            value={this.state.time}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Enter Description Here:
          <textarea
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </label>

        <input type="submit" value="Submit"/>

      </form>
    )
  }
}

export { HostEventForm };
