import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function dashboardReducer(
  state = initialState.aggregates,
  action
) {
  switch (action.type) {
    case types.LOAD_UPDATED_AGGREGATES_SUCCESS:
      return [...aggregateTrackings(action.aggregates)];

    default:
      return state;
  }
}

function aggregateTrackings(trackings) {
  trackings.forEach(element => {    
    element["diff"] = element["marketPrice"];// - element["costPrice"];
  });
  return trackings;
}