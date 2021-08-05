import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const ButtonLight = styled(Link)`
  background-color: #fff;
  border: 1px solid #aaaaaa;
  color: black;
  padding: 7px 17px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    border: 1px solid #000;
  }
`;

const Button = styled(Link)`
  background-color: #111112;
  border: none;
  color: white;
  padding: 7px 17px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #414141;
  }
`;

const BigButton = styled(Link)`
  background-color: #000;
  border: none;
  margin: 1rem 0 1rem 0;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    border: 1px solid #000;
  }
`;

export default class ButtonLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return !this.props.big ? (
      this.props.light ? (
        <ButtonLight to={this.props.to}>{this.props.children}</ButtonLight>
      ) : (
        <Button to={this.props.to}>{this.props.children}</Button>
      )
    ) : (
      <BigButton to={this.props.to}>{this.props.children}</BigButton>
    );
  }
}
