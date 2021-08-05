import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setListingError,
  setListingPending,
  setListingSuccess,
} from "../../../actions/listings";

class NewListing extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch(setListingPending(false));
    this.props.dispatch(setListingSuccess(false));
    this.props.dispatch(setListingError(null));
  }
  render() {
    return (
      <Link
        to="/newlisting"
        style={{ color: "#000" }}
        onClick={() => this.handleClick()}
      >
        Create a Listing
      </Link>
    );
  }
}

export default connect()(NewListing);
