import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import AddStudent from "./components/add-student.component";
import AddFaculty from "./components/add-faculty.component";
import AddSubject from "./components/add-subject.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import Student from "./components/student.component";
import StudentsList from "./components/students-list.component";
import Faculty from "./components/faculty.component";
import FacultyList from "./components/faculty-list.component";
import Subject from "./components/subject.component";
import SubjectList from "./components/subject-list.component";
import Login from "./components/login.component";



class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
           <Link to={"/ " } className="navbar-brand">
            Learner's Academy
           </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Tutorials
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                TutorialsList
              </Link>
            </li>
               <li className="nav-item">
              <Link to={"/student"} className="nav-link">
                Student
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                StudentsList
              </Link>
            </li>
             <li className="nav-item">
              <Link to={"/faculties"} className="nav-link">
                Faculty
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/faculty"} className="nav-link">
                FacultyList
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/subject"} className="nav-link">
                Subject
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/subjects"} className="nav-link">
                Subjectlist
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path={["/", "/students"]} component={StudentsList} />
            <Route exact path={["/", "/faculty"]} component={FacultyList} />
            <Route exact path={["/", "/subjects"]} component={SubjectList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route exact path="/student" component={AddStudent} />
            <Route path="/tutorials/:id" component={Tutorial} />
            <Route path="/students/:id" component={Student} />
            <Route path="/faculties/:id" component={Faculty} />
             <Route path="/subject/:id" component={Subject} />
             <Route exact path="/faculties" component={AddFaculty} />
             <Route exact path="/subject" component={AddSubject} />
             <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
