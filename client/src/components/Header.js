import React, { Component } from "react";
import { connect } from "react-redux";
// import the link components from react-router-dom
import { Link } from "react-router-dom";
import Payments from "./Payments";

// class based as I want to place a function inm here responsible for
// deciding what to render inside the header component
class Header extends Component {
  // for the header, depending on the state of login/logout, show different JSX
  // use a switch statement
  renderContent() {
    switch (this.props.auth) {
      case null:
        return; // dont want to show anything in this case
      // not logged in, send to google oauth
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="3" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  // if the user is present, send to surveys page. If not, send to the main page '/'
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

// state property generated by state.auth
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
// with react components, we use className as opposed to class for the rendering and nut
