import React from "react";
import { connect } from "react-redux";
import Layout from "../components/LayoutHome";
import OffsetGrid from "../components/UI/OffsetGrid";
import TopReviews from "../components/TopReviews";
import PopularListings from "../components/PopularListings";
import styled from "@emotion/styled";
import Search from "../components/MainNav/SearchBox";
const Padder = styled("div")`
  padding: 2rem 0 0 0;
`;

const BigSearch = styled("div")`
  padding: 1rem 0;
  & > span {
    margin: 0;
    height: 60px;
    border-radius: 20px;
  }
`;
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);

    console.log(this.props.cookies);
  }
  render() {
    return (
      <Layout className="App">
        <PopularListings />
        <br />
        <br />
        <hr />
        <Padder>
          <OffsetGrid
            left={
              <>
                <div style={{ fontWeight: 400, fontSize: "1.5rem" }}>
                  World class talks and workshops, from around the world. <br />
                  Airfive helps you grow your social network, <br />
                  over the air rather than in person.{" "}
                </div>
                <br />
                <BigSearch>
                  <Search />
                </BigSearch>
              </>
            }
            right={<div style={{ fontSize: "6rem" }}> 👋</div>}
          />
          <TopReviews />
        </Padder>
        <hr />
        Created by Garrett Vercoe, Will Lampert, and Makonnen Makonnen
        <br />
        <div style={{ paddingBottom: "3rem" }} />
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
export default connect(mapStateToProps)(Home);
