import React, { Component } from "react";
import subjectDataService from "../services/subject.service";

export default class AddSubject extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.saveSubject = this.saveSubject.bind(this);
    this.newSubject = this.newSubject.bind(this);

    this.state = {
      id: null,
      name: "",
      time: "", 
     
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeTime(e) {
    this.setState({
      time: e.target.value
    });
  }

  saveSubject() {
    var data = {
      name: this.state.name,
      time: this.state.time
    };

    subjectDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          time: response.data.time,
          

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSubject() {
    this.setState({
      id: null,
      name: "",
      time: "",
      

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSubject}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                type="text"
                className="form-control"
                id="Time"
                required
                value={this.state.time}
                onChange={this.onChangeTime}
                name="Time"
              />
            </div>

            <button onClick={this.saveSubject} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
