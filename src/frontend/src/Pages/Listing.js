import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import styled from "@emotion/styled";
import OffsetGrid from "../components/UI/OffsetGrid";
import Avatar from "../components/UI/Avatar";
import ReviewStars from "../components/UI/ReviewStars";
import ReviewAmount from "../components/UI/ReviewAmount";
import StickyCard from "../components/StickyCard";
import BookForm from "../components/BookForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faComments } from "@fortawesome/free-solid-svg-icons";
import DeleteListing from "../components/DeleteListing";
import { callProfileApi } from "../actions/profile";
import ReviewsAbout from "../components/Profile/ReviewsAbout";
import Recommendations from "../components/Recommendations";
const ImageContainer = styled("div")`
  display: flex;
  width: 100%;
  height: 55vh;
  position: relative;
`;

const AvatarText = styled("div")`
  & > div {
    width: 50px;
    height: 50px;
  }

  & > div > img {
    vertical-align: middle;
  }
  display: inline-block;
`;

const Ratings = styled("div")`
  transform: scale(0.9);
  margin-left: -7px;
`;

const AboutHost = styled("h3")`
  padding-left: 1rem;
  margin-bottom: 0rem;
  display: inline-block;
`;

const AvatarLg = styled("div")`
  & > div {
    width: 70px;
    height: 70px;
  }

  & > div > img {
    vertical-align: middle;
  }
  display: inline-block;

  &:hover > div {
    border: 0.5px solid #e71676;
  }
`;

const Text = styled("p")`
  font-size: 1rem;
  padding: 1rem 0;
`;

const FeatureText = styled("p")`
  padding-left: 1rem;
  font-size: 1rem;
  display: inline-block;
`;

const TextAligner = styled("div")`
  padding-left: 1.5rem;
`;
const Subtext = styled("div")`
  display: block;

  font-size: 0.75rem;
  font-weight: 500;
  color: #919191;
`;

const JoinHost = styled("h4")`
  margin-bottom: 0rem;
  display: inline-block;
`;

const Padder = styled("div")`
  padding: 2rem 0;
`;
const FeaturePadder = styled("div")`
  padding: 2rem 0;
  display: flex;

  & > div {
    padding-right: 5rem;
  }
`;
const CardPadder = styled("div")`
  padding: 1.5rem 1rem 0 1rem;
`;

const ShortText = styled("div")`
  padding: 3rem 0;
  font-size: 1.25rem;
`;
const Title = styled("h1")`
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 0;
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 10rem 1rem 1rem 1.5rem;
  background: rgba(0, 0, 0, 0);
  width: 100%;
  background: -moz-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) %,
    rgba(0, 0, 0, 0.73) 100%
  );
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, rgba(0, 0, 0, 0)),
    color-stop(47%, rgba(0, 0, 0, 0)),
    color-stop(100%, rgba(0, 0, 0, 0.73))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 47%,
    rgba(0, 0, 0, 0.73) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 47%,
    rgba(0, 0, 0, 0.73) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 47%,
    rgba(0, 0, 0, 0.73) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 47%,
    rgba(0, 0, 0, 0.73) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000', GradientType=0 );
  position: absolute;
  color: #fff;
  z-index: 1;
  -webkit-transition: all 1000ms ease-out;
  -moz-transition: all 1000ms ease-out;
  -o-transition: all 1000ms ease-out;
  -ms-transition: all 1000ms ease-out;
  transition: all 1000ms ease-out;
  left: 0;
`;
const Price = styled("div")`
  font-size: 1rem;
  font-weight: 600;
`;
const DateItem = styled("div")`
  font-size: 1rem;
  font-weight: 600;
  color: #e71676;
`;

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingId: this.props.location.pathname.substring(9),
      data: null,
      username: null,
      review: null,
      user: null,
      listings: null,
      revAmt: null,
    };

    this.handleProfile = this.handleProfile.bind(this);
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

  getListing(id) {
    const LISTING_URL = "/experience/v1/listing/" + id;
    axios.get(LISTING_URL, { crossdomain: true }).then((res) => {
      if (res.data.found === true) {
        this.setState({
          data: res.data.Listing[0],
        });
      }

      this.handleProfile(this.state.data.username);
    });
  }

  componentDidMount() {
    this.getListing(this.state.listingId);
  }

  render() {
    return (
      this.state.user && (
        <Layout className="App">
          {this.state.data && (
            <Padder>
              <OffsetGrid
                left={
                  <>
                    <ImageContainer>
                      <Title>{this.state.data.title}</Title>
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={this.state.data.image}
                      />
                    </ImageContainer>
                    <ShortText>{this.state.data.short_description}</ShortText>
                    <hr />
                    <FeaturePadder>
                      <div>
                        <FontAwesomeIcon
                          className="plus-icon inl-blk fa-lg"
                          style={{ color: "#797979" }}
                          icon={faCompass}
                        />
                        <FeatureText> {this.state.user.address}</FeatureText>
                      </div>
                      <div>
                        <FontAwesomeIcon
                          className="plus-icon inl-blk fa-lg"
                          style={{ color: "#797979" }}
                          icon={faComments}
                        />
                        <FeatureText> Hosted in English</FeatureText>
                      </div>
                    </FeaturePadder>
                    <hr />
                    <Padder>
                      <h3>What We are Going to Do</h3>
                      <Text> {this.state.data.long_description}</Text>
                    </Padder>
                    <hr />
                    <Padder>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AvatarText>
                          <Avatar username={this.state.data.username} />
                        </AvatarText>
                        <AboutHost>About the Host</AboutHost>
                      </div>
                      <Text> {this.state.user.description}</Text>
                    </Padder>
                    <hr />
                    <Padder>
                      <ReviewsAbout
                        reviews={this.state.review}
                        name={this.state.user.name}
                        username={this.state.data.username}
                      />
                    </Padder>
                    <hr />
                    <Padder>
                      <Recommendations id={this.state.listingId} />
                    </Padder>
                  </>
                }
                right={
                  <StickyCard>
                    <CardPadder>
                      {" "}
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        {" "}
                        <Link to={"/user/" + this.state.data.username}>
                          <AvatarLg>
                            <Avatar username={this.state.data.username} />
                          </AvatarLg>
                        </Link>
                        <TextAligner>
                          <JoinHost>Join {this.state.user.name}</JoinHost>
                          <Subtext> And others</Subtext>
                          <Ratings>
                            <ReviewStars
                              rating={Math.floor(this.state.user.rating)}
                            />
                            <ReviewAmount amount={this.state.revAmt} />
                          </Ratings>
                        </TextAligner>
                      </div>
                      <br />
                      <div
                        style={{
                          textAlign: "center",
                          // display: "flex",
                          // justifyContent: "space-between",
                        }}
                      >
                        <Price>${this.state.data.price} per person</Price>
                        <DateItem>
                          {new Date(this.state.data.date).toLocaleString(
                            "en-US",
                            {
                              month: "long",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </DateItem>
                      </div>
                      {this.props.loggedIn &&
                      this.props.username == this.state.data.username ? (
                        <DeleteListing id={this.state.listingId} />
                      ) : (
                        <BookForm />
                      )}
                    </CardPadder>
                  </StickyCard>
                }
              />
            </Padder>
          )}
        </Layout>
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.user.loggedIn,
    username: state.user.username,
  };
};
export default connect(mapStateToProps)(Listing);
