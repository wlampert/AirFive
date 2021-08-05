import { combineReducers } from "redux";
import handlingLogin from "./handlingLogin";
import handlingListings from "./handlingListings";
import signup from "./signup";
import user from "./user";
const sharpifyApp = combineReducers({
  handlingLogin,
  handlingListings,
  signup,
  user,
});

export default sharpifyApp;
