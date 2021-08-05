import React from "react";
import styled from "@emotion/styled";
import Avatar from "../UI/Avatar";

const Enlarger = styled("div")`
  & > div {
    width: 80px;
    height: 80px;
  }

  & > div > img {
    vertical-align: middle;
  }
  display: inline-block;
`;

const Text = styled("h2")`
  padding-left: 2rem;
  margin-bottom: 0;
  display: inline-block;
`;

export default class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Enlarger>
          <Avatar username={this.props.username} />
        </Enlarger>
        {this.props.name ? (
          <Text>Hi, I'm {this.props.name}!</Text>
        ) : (
          <Text>Hi, I'm {this.props.username}!</Text>
        )}
      </div>
    );
  }
}
