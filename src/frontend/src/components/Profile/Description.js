import React from "react";
import styled from "@emotion/styled";
import ReadMoreReact from "read-more-react";

const Styles = styled("div")`
  padding: 2.5em 0;
  font-size: 1rem;
  & > div > span > div {
    color: #868686;
    cursor: pointer;
  }
`;

export default class Description extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Styles>
        <ReadMoreReact
          min={100}
          ideal={350}
          max={500}
          text={this.props.text}
          readMoreText={"Read More..."}
        />
      </Styles>
    );
  }
}
