import { SET_LOGGED_IN } from "../actions/loginState";
import { DEACTIVATE_PROFILE_MENU } from "../actions/header";

export default function reducer(
  state = {
    loggedIn: false,
    isProfileMenuActive: false,
  },
  action
) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.loggedIn,
        username: action.username,
      });
    case DEACTIVATE_PROFILE_MENU:
      return Object.assign({}, state, {
        isProfileMenuActive: false,
      });

    default:
      return state;
  }
}
