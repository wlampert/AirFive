import React from "react";
import Button from "./UI/Button";
const HeroContainer = {
  padding: "8rem 0 7rem 0",
};

const Description = {
  color: "#fff",
  fontWeight: 400,
  fontSize: `1.25em`,
};

export default class Hero extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={HeroContainer}>
        <h1 style={{ color: "#fff" }}>
          Hop onto live events, anywhere in the world, <br /> from the comfort
          of your home.{" "}
        </h1>
      </div>
    );
  }
}
