import React from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Icon = styled("div")`
  flex: 0 0 40px;
  border-radius: 50%;
  height: 40px;
  margin-left: 8px;
  overflow: hidden;
  width: 40px;
  position: relative;
  display: inline-block;
  z-index: 1;
`;

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
    };
    this.handleAvatar = this.handleAvatar.bind(this);
    this.callAvatarApi = this.callAvatarApi.bind(this);
    this.handleAvatar();
  }

  callAvatarApi(username, callback) {
    const AVATAR_URL = "/experience/v1/profile/avatar/" + username;
    console.log("Viewing Avatar: " + username);
    setTimeout(() => {
      axios({
        method: "get",
        url: AVATAR_URL,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((res) => {
        return callback(res.data);
      });
    }, 10);
  }

  handleAvatar() {
    this.callAvatarApi(this.props.username, (i) => {
      if (i.image_link !== "404") {
        this.setState({ url: i.image_link });
      }
    });
  }
  render() {
    return (
      <>
        {this.state.url ? (
          <Icon>
            <img
              src={this.state.url}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Icon>
        ) : (
          <Icon>
            <FontAwesomeIcon
              className="plus-icon inl-blk fa-3x"
              style={{ color: "#797979" }}
              icon={faUserCircle}
            />
          </Icon>
        )}
      </>
    );
  }
}
