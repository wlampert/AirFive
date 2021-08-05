//this component provides the padding and page structure that gets propogated to all pages.
import React from "react";
import Header from "./MainNav/Header";

const LayoutStyle = {
  margin: ` 3rem 12.5vw 0 12.5vw`,
  // margin: ` 3rem 10vw 0 10vw`,
};

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={LayoutStyle}>
        <>
          <Header alternate={false} />
          {this.props.children}
        </>
      </div>
    );
  }
}
