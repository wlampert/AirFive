import React from "react";
import StylistSummary from "./StylistSummary";
import Grid from "./Grid";
import axios from "axios";

const API_URL = "/experience/v1/detail/";
export default class TopStylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stylistList: [] };
    this.createStylists = this.createStylists.bind(this);
  }
  componentDidMount() {
    this.createStylists();
  }
  createStylists() {
    axios.get(API_URL, { crossdomain: true }).then(res =>
      this.setState({
        stylistList: res.data["Top Stylists"]
      })
    );
  }
  render() {
    return this.state.stylistList ? (
      <div>
        <h2 style={{ paddingBottom: "3rem" }}>Top-rated Stylists</h2>
        <Grid>
          {this.state.stylistList.map((stylist, i) => (
            <StylistSummary
              username={stylist.username}
              rating={stylist.rating}
              email={stylist.email}
            />
          ))}
        </Grid>
      </div>
    ) : null;
  }
}
