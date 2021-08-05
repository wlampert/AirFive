import React from "react";

const GridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  columnGap: `1.5rem`,
  rowGap: "2rem",
};

export default class TopStylists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div style={GridStyle}>{this.props.children}</div>;
  }
}
