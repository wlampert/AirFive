import React from "react";
import logo from "../../assets/logo.svg";
import Button from "../UI/Button";
import { Link, StaticRouter } from "react-router-dom";
import styled from "@emotion/styled";
import Login from "./Login";
import Signup from "./Signup";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import Search from "./SearchBox";
import { connect } from "react-redux";

const LogoStyle = {
  height: "1.5em",
  verticalAlign: "middle",
};

const NavStyle = {
  padding: "2em 12.5vw 1em 12.5vw",
  display: "flex",
  alignItems: "left",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  borderBottom: ".5px solid #E1E1E1",
  backgroundColor: "#fff",
  justifyContent: "space-between",
};
const NavItem = styled("li")`
  margin-left: 1rem;
  display: inline-block;
`;

const SearchItem = styled("div")`
  margin-left: 2rem;
  display: inline-block;
`;

const LeftNav = styled("div")`
  display: inline-block;
`;

const Background = {
  height: "3rem",
  marginBottom: "2rem",
  position: "relative",
};
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={Background}>
        <div style={NavStyle}>
          <LeftNav>
            <Link to="/">
              <img src={logo} style={LogoStyle} />
            </Link>
            <SearchItem>
              <Search />
            </SearchItem>
          </LeftNav>
          <ul>
            {!this.props.loggedIn ? (
              <>
                <NavItem>
                  <Login />
                </NavItem>
                <NavItem>
                  <Signup></Signup>
                </NavItem>
              </>
            ) : (
              <div>
                <ProfileMenu username={this.props.username} />
              </div>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(Header);
