import React from "react";
import styled from "@emotion/styled";
import ReviewStars from "../UI/ReviewStars";
const GridLeft = styled("div")`
  grid-column: 0 / span 8;
`;

const GridRight = styled("div")`
grid-column: 8/span 2;
  }
`;
export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.data && (
        <div>
          {/* <ReviewStars rating={this.props.rating} /> */}
          {this.props.data.rating && (
            <ReviewStars rating={Math.floor(this.props.data.rating)} />
          )}
          <p style={{ display: "inline-block" }}>
            {this.props.reviewsAmount} Reviews
          </p>
          <hr />
          {this.props.data.name && (
            <div>
              <p>{this.props.data.name} provided:</p>
              <ul>
                {this.props.data.email && <li> Email</li>}
                {this.props.data.phone_number && <li> Phone Number</li>}
              </ul>
            </div>
          )}
        </div>
      )
    );
  }
}
