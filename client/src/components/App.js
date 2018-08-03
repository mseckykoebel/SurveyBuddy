import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// given components the ability to use action creators
import { connect } from "react-redux";
import * as actions from "../actions";
import "./index.css"; 

// Header component
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import Footer from "./Footer"; // NEW FOOTER

// add container to the div so the page looks less shitty
class App extends Component {
  // add the first lifecycle method
  // as soon as the comp has been mounted, figure out if the user is signed in
  componentDidMount() {
    // this.props.name of the action creator!!!
    this.props.fetchUser();
  }

  // container keyword adds a lot of padding
  render() {
    return (
      <div classBame="body">
        <BrowserRouter>
          <div className="container">
            <Header />
            <div className="main">
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
              <Route exact path="/surveys" component={Footer} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// second arg is all of the action creators we want to wire up
export default connect(
  null,
  actions
)(App);

// the actions are assigned to the App component as props
