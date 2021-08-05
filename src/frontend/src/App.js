import React from "react";
import Details from "./Pages/Details";
import NotFound from "./Pages/NotFound";
import { connect } from "react-redux";
import NewListing from "./Pages/NewListing";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Listing from "./Pages/Listing";

import EditProfile from "./Pages/EditProfile";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";
import "./styles/App.css";
import { withCookies } from "react-cookie";
import axios from "axios";
import qs from "qs";
import { setLoggedIn } from "./actions/loginState";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const AUTH = "/experience/v1/authenticate/";
    axios({
      method: "post",
      url: AUTH,
      data: qs.stringify({
        cookie: this.props.cookies.get("LoginToken"),
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((res) => {
      if (res.data.authenticated === true) {
        this.props.dispatch(setLoggedIn(true, res.data.username));
      } else {
      }
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home cookies={this.props.cookies} />}
          />
          <Route exact path="/details" component={Details} />
          <Route path="/search/" component={Search} />
          <Route path="/listing/" component={Listing} />
          <Route path="/edit-profile/" component={EditProfile} />
          <Route path="/user/:username" component={Profile} />

          {this.props.loggedIn ? (
            <Route exact path="/newlisting" component={NewListing} />
          ) : null}

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
  };
};

// export default withCookies(connect(mapStateToProps)(App));
export default withCookies(connect(mapStateToProps)(App));
