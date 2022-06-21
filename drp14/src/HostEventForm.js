import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

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
      selectedFile: "",
      image: "",
      images: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleImageSelect(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  async handleImageUpload() {
    console.log(this.state.selectedFile);

    if (
      this.state.selectedFile !== "" &&
      (this.state.selectedFile.size > 4, 194, 304)
    ) {
      alert("Image is too big! Maximum size is 4MB");
      return;
    }

    this.setState({ image: URL.createObjectURL(this.state.selectedFile) });
    const data = new FormData();
    data.append("image", this.state.selectedFile);
    const params = {
      method: "POST",
      body: data,
    };
    const response = await fetch("/upload_image", params);
    const body = await response.json();
    if (response.status !== 200) {
      console.log(body.message);
      return;
    }
    this.setState({ images: [body._id, ...this.state.images] });
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
            <Row>
              <input
                className="form-control mr-sm-2 m-2"
                placeholder="Choose Image"
                name="image"
                type="file"
                value={this.state.imageText}
                onChange={this.handleImageSelect}
              />
              <Button onClick={this.handleImageUpload}>Upload</Button>
            </Row>
            <input type="submit" value="Submit" />
            {this.state.image === "" ? (
              <p />
            ) : (
              <img src={this.state.image} alt="" />
            )}
          </form>
        }
      </div>
    );
  }
}

export default HostEventForm;
