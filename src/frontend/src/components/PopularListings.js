import React from "react";
import Grid from "./Grid";
import axios from "axios";
import EventResult from "./StylistSummary";

const Block = {
  margin: "10rem 16.5vw  10rem 16.5vw",
  padding: "5rem 0 8rem 0",
};

export default class PopularListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.getPopularListings = this.getPopularListings.bind(this);
  }

  componentDidMount() {
    this.getPopularListings();
  }
  getPopularListings() {
    const POPULAR_API = "/experience/v1/hot/";
    axios.get(POPULAR_API, { crossdomain: true }).then((res) => {
      if (res.data.found === true) {
        this.setState({
          data: res.data.results,
        });
      }
    });
  }

  render() {
    return (
      this.state.data && (
        <div>
          <h3 style={{ color: "#fff" }}>Popular online events coming up</h3>
          <br />
          <br />
          <Grid>
            {this.state.data.map((result, i) => (
              <EventResult
                title={result.title}
                price={result.price}
                image_url={result.image_link}
                id={result.id}
              />
            ))}
          </Grid>
        </div>
      )
    );
  }
}
