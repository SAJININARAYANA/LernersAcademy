import React, { Component } from "react";
import SubjectDataService from "../services/subject.service";

export default class Subject extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.getSubject = this.getSubject.bind(this);
    this.updateClsbreak = this.updateClsbreak.bind(this);
    this.updateSubject = this.updateSubject.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);

    this.state = {
      currentSubject: {
        id: null,
        name: "",
        time: "",
        clsbreak: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSubject(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSubject: {
          ...prevState.currentSubject,
          name: name
        }
      };
    });
  }

  onChangeTime(e) {
    const time = e.target.value;
    
    this.setState(prevState => ({
      currentSubject: {
        ...prevState.currentSubject,
        time: time
      }
    }));
  }

  getSubject(id) {
    SubjectDataService.get(id)
      .then(response => {
        this.setState({
          currentSubject: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateClsbreak(status) {
    var data = {
      id: this.state.currentSubject.id,
      name: this.state.currentSubject.name,
      time: this.state.currentSubject.time,
      clsbreak: status
    };
    SubjectDataService.update(this.state.currentSubject.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSubject: {
            ...prevState.currentSubject,
            clsbreak: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSubject() {
    SubjectDataService.update(
      this.state.currentSubject.id,
      this.state.currentSubject
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The subject was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSubject() {    
    SubjectDataService.delete(this.state.currentSubject.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/subject')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSubject } = this.state;

    return (
      <div>
        {currentSubject ? (
          <div className="edit-form">
            <h4>Subject</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentSubject.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="time"
                  value={currentSubject.time}
                  onChange={this.onChangetime}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentSubject.clsbreak ? "clsbreak" : "Pending"}
              </div>
            </form>

            {currentSubject.clsbreak ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateClsbreak(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateClsbreak(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSubject}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSubject}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Subject...</p>
          </div>
        )}
      </div>
    );
  }
}
