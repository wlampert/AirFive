import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { logout } from "../../../actions/header";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLogout = this.toggleLogout.bind(this);
  }
  toggleLogout() {
    this.props.dispatch(logout());
    this.props.cookies.remove("LoginToken");
  }

  render() {
    return (
      <Link
        to="/"
        style={{ color: "#666" }}
        onClick={() => this.toggleLogout()}
      >
        Log out
      </Link>
    );
  }
}

export default withCookies(connect()(Logout));
//
