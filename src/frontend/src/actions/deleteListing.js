import axios from "axios";
import qs from "qs";

export function callDeleteListingApi(listingId, cookie, callback) {
  const DELETE_LISTING_URL = "/experience/v1/deleteListing/";
  setTimeout(() => {
    axios({
      method: "post",
      url: DELETE_LISTING_URL,
      data: qs.stringify({
        listing_id: listingId,
        cookie: cookie,
      }),
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
