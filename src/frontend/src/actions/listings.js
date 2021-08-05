export function setListingPending(isListingPending) {
  return {
    type: SET_LISTING_PENDING,
    isListingPending,
  };
}

export function setListingSuccess(isListingSuccess) {
  return {
    type: SET_LISTING_SUCCESS,
    isListingSuccess,
  };
}

export function setListingError(listingError) {
  return {
    type: SET_LISTING_ERROR,
    listingError,
  };
}

export const SET_LISTING_PENDING = "SET_LISTING_PENDING";
export const SET_LISTING_SUCCESS = "SET_LISTING_SUCCESS";
export const SET_LISTING_ERROR = "SET_LISTING_ERROR";
