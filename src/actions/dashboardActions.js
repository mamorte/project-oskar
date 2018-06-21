import * as types from "./actionTypes";
import trackingApi from "../api/mockTrackingApi";
import { beginAjaxCall } from "./ajaxStatusActions";

export function loadUpdatedAggregates() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return trackingApi
    .getAllTrackings()
      .then(trackings => {
        dispatch( { type: types.LOAD_UPDATED_AGGREGATES_SUCCESS, trackings });
      })
      .catch(error => {
        throw error;
      });
  };
}

/*
export function loadTrackingsAndTheirAggregates() {
  // Again, Redux Thunk will inject dispatch here.
  // It also injects a second argument called getState() that lets us read the current state.
  return (dispatch, getState) => {
    // Remember I told you dispatch() can now handle thunks?
    return dispatch(loadTrackings()).then(() => {
      // Assuming this is where the fetched user got stored
      const trackingsToAggregate = getState().allTrackings;
      // And we can dispatch() another thunk now!
      return dispatch(getAggregates(trackingsToAggregate));
    });
  };
}
*/
