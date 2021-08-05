import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import Logout from "./Logout";
import NewListing from "./NewListing";
import { Link } from "react-router-dom";
import ViewProfile from "./ViewProfile";
import Avatar from "../../UI/Avatar";
export default class ProfileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
    this.triggerHover = this.triggerHover.bind(this);
  }

  triggerHover(prevState) {
    this.setState({ hovered: !prevState.hovered });
  }

  render() {
    return (
      <>
        <div onMouseDownCapture={() => this.triggerHover(this.state)}>
          <ProfileSummary username={this.props.username} />
        </div>
        {this.state.hovered ? (
          <OutsideAlerter handleClick={() => this.triggerHover(this.state)}>
            <Menu />
          </OutsideAlerter>
        ) : null}
      </>
    );
  }
}

const DropdownBackground = styled("div")`
  transform-origin: 0 0;

  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  margin: 0.5rem 0 0 -5rem;
  box-shadow: 0 7px 25px rgba(50, 50, 93, 0.2);
`;

const ProfileButton = styled("div")`
  -webkit-box-align: center;
  -ms-flex-align: center;

  cursor: pointer;
  display: inline-flex;

  margin: 0px;
  outline: none;
  padding: 5px 5px 5px 16px;
  text-align: inherit;
  text-decoration: none;

  user-select: auto;
  -webkit-align-items: center;
  align-items: center;
  border-radius: 24px;
  height: 48px;
  position: relative;
  vertical-align: middle;
  -webkit-transition: box-shadow 0.2s ease;
  -moz-transition: box-shadow 0.2s ease;
  transition: box-shadow 0.2s ease;
  z-index: 1;
  background-color: #ffffff;
  border-color: #ebebeb;
  color: #222222;

  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.2);

  &:hover {
    box-shadow: 0 1px 10px rgba(50, 50, 93, 0.2);
  }
`;

const Username = styled("h6")`
  font-size: 14px;
  line-height: 14px;
  flex: 1 1 auto;
  font-weight: 600;
  margin-top: 5px;
  position: relative;
  white-space: nowrap;
  z-index: 1;
  text-transform: capitalize;
`;

const DropdownContent = styled("ul")`
  width: 15rem;
  padding: 1.5rem 0;
  margin: 0 auto;
  list-style-type: none;
`;

const DropdownItem = styled("li")`
  padding: 0.33rem;
  font-size: 0.9rem;
  color: #000;
`;

const LinkItem = styled("div")`
  padding: 0.25rem 1rem;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f5f5f5;
  }
`;
class Menu extends React.Component {
  render() {
    return (
      <>
        <DropdownContainer>
          <DropdownContent>
            <LinkItem>
              <DropdownItem>
                <ViewProfile />
              </DropdownItem>
            </LinkItem>
            <LinkItem>
              <DropdownItem>
                <NewListing />
              </DropdownItem>
            </LinkItem>
            <DropdownItem>
              {" "}
              <hr />
            </DropdownItem>
            <LinkItem>
              <DropdownItem style={{ color: "#666" }}>
                <Link style={{ color: "#666" }} to="/edit-profile">
                  Account Settings
                </Link>
              </DropdownItem>
            </LinkItem>
            <LinkItem>
              <DropdownItem>
                <Logout />
              </DropdownItem>
            </LinkItem>
          </DropdownContent>
        </DropdownContainer>
      </>
    );
  }
}

class DropdownContainer extends React.Component {
  render() {
    return (
      <div>
        <DropdownBackground>{this.props.children}</DropdownBackground>
      </div>
    );
  }
}

class ProfileSummary extends React.Component {
  render() {
    return (
      <ProfileButton>
        <Username style={{ display: "inline-block" }}>
          {this.props.username}
        </Username>
        <Avatar username={this.props.username} />
      </ProfileButton>
    );
  }
}

/**
 * Component that alerts if you click outside of it
 */
class OutsideAlerter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remove: false,
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.handleClick();
    }
  }

  render() {
    return (
      <div ref={this.setWrapperRef}>
        {!this.state.remove ? this.props.children : null}
      </div>
    );
  }
}
