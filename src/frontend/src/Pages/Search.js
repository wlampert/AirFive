import React from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import axios from "axios";
import qs from "qs";
import queryString from "query-string";
import EventResult from "../components/StylistSummary";
import Grid from "../components/Grid";
import styled from "@emotion/styled";

const Results = styled("div")`
  margin: 2rem 0;
`;
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: null, data: null };
    this.callSearchApi = this.callSearchApi.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  callSearchApi(query, callback) {
    const SEARCH_URL = "/experience/v1/search/";
    console.log("Searching: " + query);
    setTimeout(() => {
      axios({
        method: "post",
        url: SEARCH_URL,
        data: qs.stringify({
          words: query,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((res) => {
        return callback(res.data);
      });
    }, 10);
  }

  handleSearch(query) {
    this.callSearchApi(query, (response) => {
      this.setState({ query: query, data: response });
    });
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.handleSearch(values.q);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const values = queryString.parse(this.props.location.search);
      this.handleSearch(values.q);
    }
  }
  render() {
    return (
      <Layout>
        <h2 style={{ textTransform: "capitalize" }}>
          Online <span style={{ color: "#E9336F" }}>{this.state.query} </span>{" "}
          Events
          <Results>
            {this.state.data && this.state.data.found === true ? (
              <Grid>
                {this.state.data.results.map((result, i) => (
                  <EventResult
                    title={result.title}
                    price={result.price}
                    image_url={result.image_link}
                    id={result.id}
                  />
                ))}
              </Grid>
            ) : (
              <h3> No Results found.</h3>
            )}
          </Results>
        </h2>
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
export default connect(mapStateToProps)(Search);
