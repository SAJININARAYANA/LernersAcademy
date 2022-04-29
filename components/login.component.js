import React, { Component } from "react";
import LoginDataService from "../services/login.service";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveLogin = this.saveLogin.bind(this);
    this.newLogin = this.newLogin.bind(this);

    this.state = {
      id: null,
      username: "",
      password: "", 
      employee: false,

      submitted: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  saveLogin() {
    var data = {
      username: this.state.username,
      password: this.state.password
    };

    LoginDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          username: response.data.username,
          password: response.data.password,
          employee: response.data.employee,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newLogin() {
    this.setState({
      id: null,
      username: "",
      password: "",
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
            <button className="btn btn-success" onClick={this.newLogin}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="username">UserName</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>

            <button onClick={this.saveLogin} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
