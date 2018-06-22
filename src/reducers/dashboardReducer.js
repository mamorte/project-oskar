import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function dashboardReducer(state = initialState.aggregates, action) {
  switch (action.type) {
    case types.LOAD_UPDATED_AGGREGATES_SUCCESS:
      return Object.assign([], aggregateTrackings(action.trackings));
    default:
      return state;
  }
}

function aggregateTrackings(trackings) {
  let allTrackings = trackings.map(tracking => Object.assign({}, tracking));
  allTrackings.forEach(tracking => {
    tracking["diff"] = tracking["marketPrice"];
  });
  return allTrackings;
}
