import React from "react";
import styled from "@emotion/styled";
const GridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  columnGap: `4.5rem`,
  rowGap: "2rem",
  paddingTop: "2rem",
};

const GridLeft = styled("div")`
  grid-column: 1 / span 7;
`;

const GridRight = styled("div")`
grid-column: 8/span 3;
  }
`;
export default class GridOffset extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={GridStyle}>
        <GridLeft>{this.props.left}</GridLeft>
        <GridRight>{this.props.right}</GridRight>
      </div>
    );
  }
}
