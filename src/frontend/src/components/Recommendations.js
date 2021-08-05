import React from "react";

import { connect } from "react-redux";
import axios from "axios";
import qs from "qs";
import { withCookies } from "react-cookie";
import EventResult from "./StylistSummary";
import ThreeGrid from "./Profile/ThreeGrid";
class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.callRecommendationApi = this.callRecommendationApi.bind(this);
    this.handleRecommendations(this.props.id);
  }

  callRecommendationApi(listingId, callback) {
    const REVIEW_URL = "/experience/v1/listing/recommendation/" + listingId;
    setTimeout(() => {
      axios({
        method: "get",
        url: REVIEW_URL,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((res) => {
        console.log(JSON.stringify(res.data));
        return callback(res.data);
      });
    }, 10);
  }

  handleRecommendations(id) {
    this.callRecommendationApi(id, (i) => this.setState({ data: i }));
  }

  render() {
    return (
      <>
        {this.state.data && this.state.data.found && (
          <div>
            <h3>Other Recommendations</h3>
            <br />
            <br />
            <ThreeGrid>
              {this.state.data.result.slice(0, 3).map((result, i) => (
                <EventResult
                  title={result.title}
                  price={result.price}
                  image_url={result.image_link}
                  id={result.id}
                />
              ))}
            </ThreeGrid>
          </div>
        )}{" "}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default withCookies(connect(mapStateToProps)(Recommendations));
