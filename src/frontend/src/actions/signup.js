import axios from "axios";
import qs from "qs";
export function setSignupPending(isSignupPending) {
  return {
    type: SET_SIGNUP_PENDING,
    isSignupPending,
  };
}

export function setSignupSuccess(isSignupSuccess) {
  return {
    type: SET_SIGNUP_SUCCESS,
    isSignupSuccess,
  };
}

export function setSignupError(signupError) {
  return {
    type: SET_SIGNUP_ERROR,
    signupError,
  };
}

export function callSignupApi(username, email, password, callback) {
  console.log("The signup api is running");
  const SIGNUP_URL = "/experience/v1/createAccount/";
  setTimeout(() => {
    axios({
      method: "post",
      url: SIGNUP_URL,
      data: qs.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((res) => {
      if (res.data.created === true) {
        return callback(null);
      } else {
        return callback(new Error("That username or email is already in use."));
      }
    });
  }, 10);
}

export const SET_SIGNUP_PENDING = "SET_SIGNUP_PENDING";
export const SET_SIGNUP_SUCCESS = "SET_SIGNUP_SUCCESS";
export const SET_SIGNUP_ERROR = "SET_SIGNUP_ERROR";
