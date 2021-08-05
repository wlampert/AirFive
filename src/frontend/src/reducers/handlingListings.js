import {
  SET_LISTING_PENDING,
  SET_LISTING_SUCCESS,
  SET_LISTING_ERROR,
} from "../actions/listings";

export default function reducer(
  state = {
    isListingSuccess: false,
    isListingPending: false,
    listingError: null,
  },
  action
) {
  switch (action.type) {
    case SET_LISTING_PENDING:
      return Object.assign({}, state, {
        isListingPending: action.isListingPending,
      });

    case SET_LISTING_SUCCESS:
      return Object.assign({}, state, {
        isListingSuccess: action.isListingSuccess,
      });

    case SET_LISTING_ERROR:
      return Object.assign({}, state, {
        listingError: action.listingError,
      });

    default:
      return state;
  }
}
