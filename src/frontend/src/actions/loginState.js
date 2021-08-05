import axios from "axios";
import qs from "qs";

export function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending,
  };
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess,
  };
}

export function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError,
  };
}

export function setLoggedIn(loggedIn, username) {
  return {
    type: SET_LOGGED_IN,
    loggedIn,
    username,
  };
}

export function callLoginApi(email, password, callback) {
  console.log("The login api is running");
  const LOGIN_URL = "/experience/v1/login/";
  setTimeout(() => {
    axios({
      method: "post",
      url: LOGIN_URL,
      data: qs.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((res) => {
      if (res.data.result === "Login succesfull") {
        return callback({ username: res.data.username, token: res.data.token });
      } else {
        return callback(new Error("Your email or password is incorrect."));
      }
    });
  }, 10);
}

export const SET_LOGIN_PENDING = "SET_LOGIN_PENDING";
export const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS";
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
export const SET_LOGGED_IN = "SET_LOGGED_IN";
