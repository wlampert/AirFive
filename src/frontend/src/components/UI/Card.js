import React from "react";
import styled from "@emotion/styled";

const Box = styled("div")`
  -moz-box-shadow: 0px 0px 25px rgba(50, 50, 93, 0.1);
  -webkit-box-shadow: 0px 0px 25px rgba(50, 50, 93, 0.1);
  box-shadow: 0px 7px 14px rgba(50, 50, 93, 0.1);
  border-radius: 5px;
  border: 0.5px solid #ebebeb;
  background-color: #fff;
  -webkit-transition: box-shadow 0.2s ease;
  -moz-transition: box-shadow 0.2s ease;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 7px 14px rgba(50, 50, 93, 0.2);
  }
`;
const CardContent = styled("div")`
  padding: 1rem 1rem 0rem 1rem;
`;

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box>
        <CardContent>{this.props.children}</CardContent>
      </Box>
    );
  }
}
