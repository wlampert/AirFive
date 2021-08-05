import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { callDeleteListingApi } from "../actions/deleteListing";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
const Manage = styled(Link)`
  padding: 1rem 0;
  font-size: 1rem;
  color: #fff;
  font-weight: 700;
  background-color: #e71676;
  display: inherit;
  position: inherit;
  text-align: center;
  border: 0px;
  border-radius: 40px;
  margin: 2rem 0;

  &:hover {
    color: white;
    background-color: #f757a0;
  }
`;
class DeleteListing extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteListing(listingId, cookie) {
    console.log("Pay big bucks");
    // callDeleteListingApi(listingId, cookie, (i) => console.log(i));
  }

  render() {
    return (
      <Manage
        onClick={() =>
          this.deleteListing(
            this.props.id,
            this.props.cookies.cookies.LoginToken
          )
        }
      >
        Promote Listing
      </Manage>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: ownProps.cookies,
  };
};
export default withCookies(connect(mapStateToProps)(DeleteListing));
