import React from "react";
import logoAlternate from "../../assets/logoAlternate.svg";
import logo from "../../assets/logo.svg";
import Button from "../UI/Button";
import { Link, StaticRouter } from "react-router-dom";
import styled from "@emotion/styled";
import Login from "./Login";
import Signup from "./Signup";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import Search from "./SearchBox";
import { connect } from "react-redux";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";

const LogoStyle = {
  height: "1.5em",
  verticalAlign: "middle",
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

const NavStyle = styled("div")(
  `
      padding: 2em 12.5vw 1em 12.5vw;
      display: flex;
      align-items: left;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      zIndex: 100;
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.4);
      justify-content: space-between;
      -webkit-transition: background-color 200ms ease;
      -ms-transition: background-color 200ms ease;
      transition: background-color 200ms ease;
    `,
  (props) => ({
    backgroundColor: props.background,
    boxShadow: props.boxshadow,
  })
);

const Background = {
  height: "3rem",
  zIndex: 99,
  marginBottom: "2rem",
  position: "relative",
};
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      color: "none",
      sticky: false,
      alternate: this.props.alternate,
    };
  }

  handleScroll = (e) => {
    if (window.scrollY > 75) {
      this.setState({ color: "#fff", sticky: true });
    } else {
      this.setState({ color: "none", sticky: false });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div style={Background}>
        <NavStyle
          background={this.state.color}
          boxshadow={
            !this.state.sticky ? "none" : "rgba(0, 0, 0, 0.1) 0px 1px 2px"
          }
        >
          <LeftNav>
            <Link to="/">
              {!this.state.sticky && this.props.alternate ? (
                <img src={logoAlternate} style={LogoStyle} />
              ) : (
                <img src={logo} style={LogoStyle} />
              )}
            </Link>
            <SearchItem>
              {this.props.alternate ? (
                <Search alternate={!this.state.sticky} />
              ) : (
                <Search alternate={false} />
              )}
            </SearchItem>
          </LeftNav>
          <ul>
            {!this.props.loggedIn ? (
              <>
                <NavItem>
                  {this.props.alternate ? (
                    <Login alternate={!this.state.sticky} />
                  ) : (
                    <Login alternate={false} />
                  )}
                </NavItem>
                <NavItem>
                  {this.props.alternate ? (
                    <Signup alternate={!this.state.sticky} />
                  ) : (
                    <Signup alternate={false} />
                  )}
                </NavItem>
              </>
            ) : (
              <div>
                <ProfileMenu username={this.props.username} />
              </div>
            )}
          </ul>
        </NavStyle>
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
