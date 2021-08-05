import {
  SET_SIGNUP_PENDING,
  SET_SIGNUP_SUCCESS,
  SET_SIGNUP_ERROR
} from "../actions/signup";

export default function reducer(
  state = {
    isSignupSuccess: false,
    isSignupPending: false,
    signupError: null
  },
  action
) {
  switch (action.type) {
    case SET_SIGNUP_PENDING:
      return Object.assign({}, state, {
        isSignupPending: action.isSignupPending
      });

    case SET_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isSignupSuccess: action.isSignupSuccess
      });

    case SET_SIGNUP_ERROR:
      return Object.assign({}, state, {
        signupError: action.signupError
      });

    default:
      return state;
  }
}
