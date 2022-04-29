import React, { Component } from "react";
import FacultyDataService from "../services/faculty.service";
import { Link } from "react-router-dom";

export default class FacultyList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFacultyname = this.onChangeSearchFacultyname.bind(this);
    this.retrieveFaculty = this.retrieveFaculty.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFaculty = this.setActiveFaculty.bind(this);
    this.removeAllFaculty = this.removeAllFaculty.bind(this);
    this.searchFacultyname = this.searchFacultyname.bind(this);

    this.state = {
      faculty: [],
      currentFaculty: null,
      currentIndex: -1,
      searchFacultyname: ""
    };
  }

  componentDidMount() {
    this.retrieveFaculty();
  }

  onChangeSearchFacultyname(e) {
    const searchFacultyname = e.target.value;

    this.setState({
      searchFacultyname: searchFacultyname
    });
  }

  retrieveFaculty() {
    FacultyDataService.getAll()
      .then(response => {
        this.setState({
          faculty: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFaculty();
    this.setState({
      currentFaculty: null,
      currentIndex: -1
    });
  }

  setActiveFaculty(faculty, index) {
    this.setState({
      currentFaculty: faculty,
      currentIndex: index
    });
  }

  removeAllFaculty() {
    FacultyDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchFacultyname() {
    this.setState({
      currentFaculty: null,
      currentIndex: -1
    });

    FacultyDataService.findByFacultyname(this.state.searchFacultyname)
      .then(response => {
        this.setState({
          faculty: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchFacultyname, faculty, currentFaculty, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by facultyname"
              value={searchFacultyname}
              onChange={this.onChangeSearchFacultyname}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFacultyname}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>FacultyList</h4>

          <ul className="list-group">
            {faculty &&
             faculty.map((faculty, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFaculty(faculty, index)}
                  key={index}
                >
                  {faculty.facultyname}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllFaculty}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentFaculty ? (
            <div>
              <h4>Faculty</h4>
              <div>
                <label>
                  <strong>facultyname:</strong>
                </label>{" "}
                {currentFaculty.facultyname}
              </div>
              <div>
                <label>
                  <strong>Subject:</strong>
                </label>{" "}
                {currentFaculty.subject}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFaculty.Employee ? "Employee" : "Pending"}
              </div>

              <Link
                to={"/faculties/" + currentFaculty.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Faculty...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
