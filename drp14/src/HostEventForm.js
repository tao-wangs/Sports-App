import React from "react";

class HostEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      date: '',
      time: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.name + this.state.location);
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
            type="text"
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
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

export { HostEventForm };
