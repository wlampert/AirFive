import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

const Text = styled("div")`
  color: #797979;
  display: inline-block;
  padding-left: 1rem;
  font-size: 1rem;
`;
const Holder = styled("div")`
  padding: 2rem 0;
`;
export default class Features extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Holder>
        <FontAwesomeIcon
          className="plus-icon inl-blk fa-lg"
          style={{ color: "#797979" }}
          icon={faCompass}
        />{" "}
        <Text>{this.props.location}</Text>
      </Holder>
    );
  }
}
