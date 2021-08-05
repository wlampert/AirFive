import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import ReviewStars from "../UI/ReviewStars";
import ReviewAmount from "../UI/ReviewAmount";
import Avatar from "../UI/Avatar";
const Holder = styled("div")`
  padding: 2rem 0;
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
const TextAligner = styled("div")`
  padding-left: 1.5rem;
`;

const Text = styled("div")`
  font-size: 1rem;
`;
const Ratings = styled("div")`
  transform: scale(0.9);
  margin-left: -7px;
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
  font-size: 1.1rem;
`;

export default class ReviewsAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  render() {
    return (
      <Holder>
        {this.props.reviews.length > 0 && (
          <>
            <h3 style={{ paddingBottom: "1rem" }}>
              {" "}
              Reviews about {this.props.name}
            </h3>
            <div>
              {this.props.reviews.slice(0, 5).map((i) => (
                <div style={{ display: "flex", padding: "1rem 0" }}>
                  <Link to={"/user/" + i.created_by_username}>
                    <Avatar username={i.created_by_username} />
                  </Link>
                  <TextAligner>
                    <JoinHost>{i.created_by_username}</JoinHost>
                    <Subtext> {i.date}</Subtext>
                    <Ratings>
                      <ReviewStars rating={i.rating} />
                    </Ratings>
                    <Text>{i.description}</Text>
                  </TextAligner>
                </div>
              ))}
            </div>
          </>
        )}
        {/* {this.props.map(reviews)} */}
        {!this.props.reviews && (
          <div>{this.props.username} has no reviews yet.</div>
        )}
      </Holder>
    );
  }
}
