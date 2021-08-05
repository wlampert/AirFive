import { setLoggedIn } from "./loginState";

function deactivateProfileMenu() {
  return {
    type: DEACTIVATE_PROFILE_MENU
  };
}

export function logout() {
  return dispatch => {
    dispatch(setLoggedIn(false));
    dispatch(deactivateProfileMenu());
  };
}

export const DEACTIVATE_PROFILE_MENU = "DEACTIVATE_PROFILE_MENU";
