import React, { Component } from "react";
import SubjectDataService from "../services/subject.service";
import { Link } from "react-router-dom";

export default class SubjectList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveSubject = this.retrieveSubject.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSubject = this.setActiveSubject.bind(this);
    this.removeAllSubject = this.removeAllSubject.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      subject: [],
      currentSubject: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveSubject();
  }

  onChangeSearchName(e) {
    const searchName= e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveSubject() {
    SubjectDataService.getAll()
      .then(response => {
        this.setState({
          subject: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSubject();
    this.setState({
      currentSubject: null,
      currentIndex: -1
    });
  }

  setActiveSubject(subject, index) {
    this.setState({
      currentSubject: subject,
      currentIndex: index
    });
  }

  removeAllSubject() {
    SubjectDataService.deleteAll()
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
      currentSubject: null,
      currentIndex: -1
    });

    SubjectDataService.findByname(this.state.searchName)
      .then(response => {
        this.setState({
          subject: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, subject, currentSubject, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
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
          <h4>Subject List</h4>

          <ul className="list-group">
            {subject &&
              subject.map((subject, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSubject(subject, index)}
                  key={index}
                >
                  {subject.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSubject}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentSubject ? (
            <div>
              <h4>Subject</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentSubject.name}
              </div>
              <div>
                <label>
                  <strong>Time:</strong>
                </label>{" "}
                {currentSubject.time}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentSubject.clsbreak ? "clsbreak" : "Pending"}
              </div>

              <Link
                to={"/subject/" + currentSubject.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Subject...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
