import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { getFormattedDate } from "../utils/dateHelper";

export default function dashboardReducer(
  state = initialState.aggregates,
  action
) {
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
    let costPrice = parseFloat(tracking["costPrice"]);
    let marketPrice = parseFloat(tracking["marketPrice"]);
    let yieldValue = marketPrice - costPrice;
    tracking["costPrice"] = costPrice;
    tracking["marketPrice"] = marketPrice;
    tracking["yieldValue"] = yieldValue;
    tracking["yieldPercent"] = (yieldValue / costPrice) * 100;
    tracking["trackingTimeShort"] = getFormattedDate(new Date(tracking["trackingTime"]));
  });

  return allTrackings;
}
