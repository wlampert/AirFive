import React from "react";
import FeaturedReview from "./UI/ReviewStars";
import Grid from "./Grid";
import axios from "axios";
import Card from "./UI/Card";
const Block = {
  margin: "10rem 16.5vw  10rem 16.5vw",
  padding: "5rem 0 8rem 0",
};

const Background = {
  backgroundColor: "#F6F6F6",
  margin: "0 -16.5vw 0 -16.5vw",
};
const API_URL = "/experience/v1/home/";
export default class TopReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviewList: [] };
    this.createReviews = this.createReviews.bind(this);
  }

  componentDidMount() {
    this.createReviews();
  }
  createReviews() {
    axios.get(API_URL, { crossdomain: true }).then((res) => {
      this.setState({
        reviewList: res.data["Top Reviews"],
      });
    });
  }

  render() {
    console.log("review:" + JSON.stringify(this.state));
    return this.state.reviewList ? (
      <div style={Background}>
        <div style={Block}>
          <h2>Most Recent Airfive Reviews</h2>
          <br />
          <Grid>
            {this.state.reviewList.map((review, i) => (
              <Card>
                <div style={{ padding: "2rem 1rem" }}>
                  <FeaturedReview rating={review.rating} />
                  <div style={{ fontSize: ".8rem", opacity: ".75" }}>
                    {review.date}
                  </div>
                  <div style={{ fontSize: "1.25rem" }}>
                    {review.description}
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </div>
    ) : null;
  }
}
