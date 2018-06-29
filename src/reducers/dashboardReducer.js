import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import _ from "lodash";
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
  });

  var trackingsByTime = _.groupBy(allTrackings, "trackingTime");
  //console.log(JSON.stringify(trackingsByTime));

  let final = [];

  for (var time in trackingsByTime) {
    let totalCostPrice = 0;
    let totalMarketPrice = 0;
    let totalYieldValue = 0;
    trackingsByTime[time].forEach(tracking => {
      totalCostPrice = totalCostPrice + tracking.costPrice;
      totalMarketPrice = totalMarketPrice + tracking.marketPrice;
      totalYieldValue = totalYieldValue + tracking.yieldValue;
    });
    final.push({
      "trackingTime": time,
      "trackingTimeShort": getFormattedDate(new Date(time)),
      "costPrice": totalCostPrice,
      "marketPrice": totalMarketPrice,
      "yieldValue": totalYieldValue,
      "yieldPercent": (totalYieldValue / totalCostPrice) * 100,
      "children": trackingsByTime[time]
    });
  }

  final.sort(function(a, b){
    var x = a.trackingTimeShort.toLowerCase();
    var y = b.trackingTimeShort.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });

  //console.log(JSON.stringify(final));
  return final;
}
