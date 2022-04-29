import React, { Component } from "react";
import FacultyDataService from "../services/faculty.service";

export default class AddFaculty extends Component {
  constructor(props) {
    super(props);
    this.onChangeFacultyname = this.onChangeFacultyname.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.saveFaculty = this.saveFaculty.bind(this);
    this.newFaculty = this.newFaculty.bind(this);

    this.state = {
      id: null,
      facultyname: "",
      subject: "", 
      employee: false,

      submitted: false
    };
  }

  onChangeFacultyname(e) {
    this.setState({
      facultyname: e.target.value
    });
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    });
  }

  saveFaculty() {
    var data = {
      facultyname: this.state.facultyname,
      subject: this.state.subject
    };

    FacultyDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          facultyname: response.data.facultyname,
          subject: response.data.subject,
          employee: response.data.employee,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newFaculty() {
    this.setState({
      id: null,
      facultyname: "",
      subject: "",
      employee: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newFaculty}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="facultyname">FacultyName</label>
              <input
                type="text"
                className="form-control"
                id="facultyname"
                required
                value={this.state.facultyname}
                onChange={this.onChangeFacultyname}
                name="facultyname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                required
                value={this.state.subject}
                onChange={this.onChangeSubject}
                name="subject"
              />
            </div>

            <button onClick={this.saveFaculty} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

