import React from "react";
import axios from "axios";
import EventResult from "../StylistSummary";
import ThreeGrid from "./ThreeGrid";
import styled from "@emotion/styled";
const Block = {
  margin: "10rem 16.5vw  10rem 16.5vw",
  padding: "5rem 0 8rem 0",
};

const Holder = styled("div")`
  padding: 2rem 0;
`;

export default class ProfileListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };

    // this.getPopularListings = this.getPopularListings.bind(this);
  }

  // componentDidMount() {
  //   this.getPopularListings();
  // }
  // getPopularListings() {
  //   const POPULAR_API = "/experience/v1/hot/";
  //   axios.get(POPULAR_API, { crossdomain: true }).then((res) => {
  //     if (res.data.found === true) {
  //       this.setState({
  //         data: res.data.results,
  //       });
  //     }
  //   });
  // }

  render() {
    return (
      <Holder>
        {this.props.listings && (
          <div>
            <h3>My Events</h3>
            <br />
            <br />
            <ThreeGrid>
              {this.props.listings.slice(0, 3).map((result, i) => (
                <EventResult
                  title={result.title}
                  price={result.price}
                  image_url={result.image}
                  id={result.id}
                />
              ))}
            </ThreeGrid>
          </div>
        )}{" "}
        {!this.props.listings && "Garrett hasn't hosted any events yet."}
      </Holder>
    );
  }
}
