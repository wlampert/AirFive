import axios from "axios";
import qs from "qs";

export function callProfileApi(username, callback) {
  const PROFILE_URL = "/experience/v1/profile/";
  console.log("Viewing Profile: " + username);
  setTimeout(() => {
    axios({
      method: "get",
      url: PROFILE_URL + username,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((res) => {
      console.log(res.data);
      return callback(res.data);
    });
  }, 10);
}
// export const SET_SIGNUP_PENDING = "SET_SIGNUP_PENDING";
// export const SET_SIGNUP_SUCCESS = "SET_SIGNUP_SUCCESS";
// export const SET_SIGNUP_ERROR = "SET_SIGNUP_ERROR";
