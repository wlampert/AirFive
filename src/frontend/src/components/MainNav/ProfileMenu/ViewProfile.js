import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setListingError,
  setListingPending,
  setListingSuccess,
} from "../../../actions/listings";

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   this.props.dispatch(setListingPending(false));
  //   this.props.dispatch(setListingSuccess(false));
  //   this.props.dispatch(setListingError(null));
  // }
  render() {
    return (
      <Link
        to={"/user/" + this.props.username}
        style={{ color: "#000" }}
        // onClick={() => this.handleClick()}
      >
        Profile
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(ViewProfile);
