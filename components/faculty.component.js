import React, { Component } from "react";
import FacultyDataService from "../services/faculty.service";

export default class Faculty extends Component {
  constructor(props) {
    super(props);
    this.onChangeFacultyname = this.onChangeFacultyname.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.getFaculty = this.getFaculty.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.updateFaculty = this.updateFaculty.bind(this);
    this.deleteFaculty = this.deleteFaculty.bind(this);

    this.state = {
      currentFaculty: {
        id: null,
        facultyname: "",
        subject: "",
        employee: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getFaculty(this.props.match.params.id);
  }

  onChangeFacultyname(e) {
    const facultyname = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFaculty: {
          ...prevState.currentFaculty,
          facultyname: facultyname
        }
      };
    });
  }

  onChangeSubject(e) {
    const subject = e.target.value;
    
    this.setState(prevState => ({
      currentFaculty: {
        ...prevState.currentFaculty,
        subject: subject
      }
    }));
  }

  getFaculty(id) {
    FacultyDataService.get(id)
      .then(response => {
        this.setState({
          currentFaculty: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateEmployee(status) {
    var data = {
      id: this.state.currentFaculty.id,
      facultyname: this.state.currentFaculty.facultyname,
      subject: this.state.currentFaculty.subject,
      employee: status
    };

    FacultyDataService.update(this.state.currentFaculty.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentFaculty: {
            ...prevState.currentfaculty,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFaculty() {
    FacultyDataService.update(
      this.state.currentFaculty.id,
      this.state.currentFaculty
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Faculty was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteFaculty() {    
    FacultyDataService.delete(this.state.currentFaculty.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/faculties')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentFaculty } = this.state;

    return (
      <div>
        {currentFaculty ? (
          <div className="edit-form">
            <h4>Faculty</h4>
            <form>
              <div className="form-group">
                <label htmlFor="facultyname">Facultyname</label>
                <input
                  type="text"
                  className="form-control"
                  id="facultyname"
                  value={currentFaculty.facultyname}
                  onChange={this.onChangeFacultyname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentFaculty.subject}
                  onChange={this.onChangeSubject}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFaculty.Employee ? "Employee" : "Pending"}
              </div>
            </form>

            {currentFaculty.employee ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateEmployee(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateEmployee(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteFaculty}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFaculty}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a subject...</p>
          </div>
        )}
      </div>
    );
  }
}
