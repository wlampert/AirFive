//this component provides the padding and page structure that gets propogated to all pages.
import React from "react";
import Header from "./MainNav/Header";
import Hero from "./Hero";
const LayoutStyle = {
  padding: ` 3rem 12.5vw 0 12.5vw`,
  // margin: ` 3rem 10vw 0 10vw`,
  display: `block`,
  backgroundSize: `cover`,
  backgroundPosition: `center`,
  backgroundRepeat: `no-repeat`,
  height: "80vh",
  backgroundImage:
    "url(https://cdn.openai.com/research-covers/openai-baselines-dqn/gradient.jpg)",
};

const Background = {};

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={LayoutStyle}>
        <>
          <Header alternate={true} />
          <Hero />
          {this.props.children}
        </>
      </div>
    );
  }
}
