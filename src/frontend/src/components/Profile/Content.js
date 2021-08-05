import React from "react";
import styled from "@emotion/styled";
import Title from "./Title";
import Description from "./Description";
import Features from "./Features";
import ProfileListings from "./ProfileListings";
import ReviewsAbout from "./ReviewsAbout";
import EditDetails from "./EditDetails";
import WriteReview from "./WriteReview";
import { connect } from "react-redux";
const Thing = styled("div")``;

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formatter = this.formatter.bind(this);
  }

  formatter(collector, data) {
    if (this.props.data) {
      return this.props.data[collector];
    }
    return "";
  }

  render() {
    return (
      <>
        {this.props.personalUser &&
          this.props.username == this.props.personalUser && <EditDetails />}
        {this.props.data && (
          <>
            <br />
            <Title username={this.props.username} name={this.props.data.name} />
            <Description text={this.props.data.description} />
            <hr />
            <Features location={this.props.data.address} />

            <hr />
            <ProfileListings listings={this.props.listings} />
            <hr />

            <ReviewsAbout
              reviews={this.props.reviews}
              name={this.props.data.name}
              username={this.props.username}
            />
            {this.props.personalUser &&
              this.props.username !== this.props.personalUser && (
                <WriteReview
                  username={this.props.username}
                  name={this.props.data.name}
                />
              )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    personalUser: state.user.username,
    cookies: ownProps.cookies,
  };
};
export default connect(mapStateToProps)(Content);
