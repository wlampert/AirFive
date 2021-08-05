import React from "react";
import styled from "@emotion/styled";

const Text = styled("div")`
  color: #919191;
  font-weight: 500;
  display: inline-block;
  font-size: 0.9rem;
`;

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>{this.props.amount} reviews</Text>;
  }
}
