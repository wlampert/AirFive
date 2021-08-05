import React from "react";

import styled from "@emotion/styled";
import { withRouter } from "react-router-dom";

const ImageContainer = {
  overflow: "hidden",
  height: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  width: "auto",
};

const Image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const Card = styled("div")`
  -moz-box-shadow: 0px 0px 25px rgba(50, 50, 93, 0.1);
  -webkit-box-shadow: 0px 0px 25px rgba(50, 50, 93, 0.1);
  box-shadow: 0px 0px 25px rgba(50, 50, 93, 0.1);
  border-radius: 5px;

  background-color: #fff;
  -webkit-transition: box-shadow 0.2s ease;
  -moz-transition: box-shadow 0.2s ease;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0px 7px 14px rgba(50, 50, 93, 0.2);
  }
`;
const CardContent = styled("div")`
  padding: 1rem 1rem 1rem 1rem;
  margin-bottom: 2rem;
`;

class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.history.push("/listing/" + this.props.id)}>
        <Card>
          <div style={ImageContainer}>
            {" "}
            <img src={this.props.image_url} style={Image} />
          </div>
          <CardContent>
            <h3>{this.props.title}</h3>
            <h3>{this.props.username}</h3>
            <h3>${this.props.price}</h3>
          </CardContent>
          {/* <FontAwesomeIcon
          className="plus-icon inl-blk fa-md"
          icon={faStar}
        />{" "}
        {this.props.rating} */}
        </Card>
      </div>
    );
  }
}
export default withRouter(Event);
