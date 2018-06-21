import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function dashboardReducer(
  state = initialState.aggregates,
  action
) {
    switch (action.type) {
    case types.LOAD_UPDATED_AGGREGATES_SUCCESS:
      //let newState = [Object.assign({}, aggregateTrackings(action.trackings))];
      let newState = Object.assign([], aggregateTrackings(action.trackings));
      console.log(action.trackings);
      return newState;
    default:
      return state;
  }
}

function aggregateTrackings(trackings) {
  return trackings;
  /*
  trackings.forEach(element => {
    element["diff"] = element["marketPrice"];// - element["costPrice"];
  });
  return [trackings[1]];
  */
}
