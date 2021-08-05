import React from "react";
import styled from "@emotion/styled";
import Card from "./UI/Card";
const Thing = styled("div")``;

// const NavStyle = styled("div")(
//     `
//         padding: 2em 12.5vw 1em 12.5vw;
//         display: flex;
//         align-items: left;
//         position: fixed;
//         top: 0;
//         left: 0;
//         right: 0;
//         zIndex: 100;
//         border-bottom: 0.5px solid rgba(255, 255, 255, 0.4);
//         justify-content: space-between;
//         -webkit-transition: background-color 200ms ease;
//         -ms-transition: background-color 200ms ease;
//         transition: background-color 200ms ease;
//       `,
//     (props) => ({
//       backgroundColor: props.background,
//       boxShadow: props.boxshadow,
//     })
//   );

export default class StickyCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      position: "inherit",
      margin: "0",
    };
  }

  handleScroll = (e) => {
    if (window.scrollY > 75) {
      this.setState({ position: "fixed", margin: "-75px" });
    } else {
      this.setState({ position: "inherit", margin: "0" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div
        style={{
          position: this.state.position,
          marginTop: this.state.margin,
          width: "20vw",
        }}
      >
        <Card>{this.props.children}</Card>
      </div>
    );
  }
}
