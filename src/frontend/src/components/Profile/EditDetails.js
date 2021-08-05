import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
const ButtonLink = styled(Link)`
  padding: 0.75rem;
  color: white;
  display: inline-block;
  background-color: #e71676;
  border-radius: 10px;
  font-weight: 700;
  margin-bottom: 3rem;
  transition: 0.3s background-color ease;

  &:hover {
    color: white;
    background-color: #f757a0;
  }
`;

export default class EditDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ButtonLink to="/edit-profile/">UPDATE INFORMATION</ButtonLink>;
  }
}
