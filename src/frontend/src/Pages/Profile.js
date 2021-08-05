import React from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import Sidebar from "../components/Profile/Sidebar";
import OffsetGrid from "../components/UI/OffsetGrid";
import Content from "../components/Profile/Content";
import axios from "axios";
import { callProfileApi } from "../actions/profile";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      review: null,
      user: null,
      listings: null,
      revAmt: null,
    };

    this.handleProfile = this.handleProfile.bind(this);
    this.handleProfile(this.props.match.params.username);
  }

  handleProfile(username) {
    callProfileApi(username, (response) => {
      this.setState({
        username: username,
        review: response.reviews,
        user: response.user,
        listings: response.listings,
        revAmt: response.num_reviews,
      });
    });
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      this.handleProfile(this.props.match.params.username);
    }
  }

  componentWillMount() {
    // const values = queryString.parse(this.props.location);
    // console.log("values +" + JSON.stringify(values));
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.location.search !== this.props.location.search) {
  //     // const values = queryString.parse(this.props.location.search);
  //     this.handleProfile(values.q);
  //   }
  // }

  // componentDidMount() {
  //   const values = queryString.parse(this.props.location.search);
  //   this.handleProfile(values.q);
  // }
  render() {
    return (
      <Layout>
        <OffsetGrid
          left={
            <Content
              username={this.state.username}
              listings={this.state.listings}
              reviews={this.state.review}
              data={this.state.user}
            />
          }
          right={
            <Sidebar reviewsAmount={this.state.revAmt} data={this.state.user} />
          }
        ></OffsetGrid>
        <div style={{ padding: "5rem 0" }} />
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state,
    cookies: ownProps.cookies,
  };
};
export default connect(mapStateToProps)(Profile);
