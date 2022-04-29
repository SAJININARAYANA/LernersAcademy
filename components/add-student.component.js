import React, { Component } from "react";
import StudentDataService from "../services/students.service";

export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);

    this.state = {
      id: null,
      name: "",
      course: "", 
      stream: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeCourse(e) {
    this.setState({
      course: e.target.value
    });
  }

  saveStudent() {
    var data = {
      name: this.state.name,
      course: this.state.course
    };

    StudentDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          course: response.data.course,
          stream: response.data.stream,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newStudent() {
    this.setState({
      id: null,
      name: "",
      course: "",
      stream: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newStudent}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Name</label>
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
              <label htmlFor="course">Course</label>
              <input
                type="text"
                className="form-control"
                id="course"
                required
                value={this.state.course}
                onChange={this.onChangeCourse}
                name="course"
              />
            </div>

            <button onClick={this.saveStudent} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
