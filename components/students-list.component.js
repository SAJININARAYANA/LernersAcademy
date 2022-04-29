import React, { Component } from "react";
import StudentDataService from "../services/students.service";
import { Link } from "react-router-dom";

export default class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudent = this.setActiveStudent.bind(this);
    this.removeAllStudents = this.removeAllStudents.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  onChangeSearchName(e) {
    const searchName = e.name.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveStudents() {
    StudentDataService.getAll()
      .then(response => {
        this.setState({
          students: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });
  }

  setActiveStudent(student, index) {
    this.setState({
      currentStudent: student,
      currentIndex: index
    });
  }

  removeAllStudents() {
    StudentDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });

    StudentDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          students: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, students, currentStudent, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Students List</h4>

          <ul className="list-group">
            {students &&
              students.map((student, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveStudent(student, index)}
                  key={index}
                >
                  {student.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllStudents}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentStudent ? (
            <div>
              <h4>Student</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentStudent.name}
              </div>
              <div>
                <label>
                  <strong>Course:</strong>
                </label>{" "}
                {currentStudent.course}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentStudent.stream ? "stream" : "Pending"}
              </div>

              <Link
                to={"/students/" + currentStudent.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Student...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
