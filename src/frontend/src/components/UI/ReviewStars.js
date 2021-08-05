import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, farStar } from "@fortawesome/free-solid-svg-icons";

const Card = {
  padding: "2.5rem",
  margin: "3em 0 0em 0",
  borderRadius: "7px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 6px 0 hsla(0,0%,0%,0.2)",
};

export default class ReviewStars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: "inline-block", paddingRight: ".33rem" }}>
        {[...Array(this.props.rating)].map((i) => (
          <FontAwesomeIcon
            className="plus-icon inl-blk fa-md"
            style={{ color: "#E71676" }}
            icon={faStar}
          />
        ))}
        {/* <p>{this.props.description}</p>
        <p style={{ color: "#7C7C7C" }}>{this.props.date}</p> */}
      </div>
    );
  }
}
