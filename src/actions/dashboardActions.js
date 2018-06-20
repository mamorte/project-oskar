import * as types from "./actionTypes";
import trackingApi from "../api/mockTrackingApi";
import { beginAjaxCall } from "./ajaxStatusActions";

export function loadDashboardSuccess(aggregates) {
  return { type: types.LOAD_DASHBOARD_SUCCESS, aggregates };
}

export function loadDashboard() {
  return dispatch => {
    dispatch(beginAjaxCall());
    trackingApi
      .getAllTrackings()
      //.then(allTrackings => {
      //    trackingApi.aggregateTrackings(allTrackings);
      //})
      .then(aggregates => {
        dispatch(loadDashboardSuccess(aggregates));
      })
      .catch(error => {
        throw error;
      });
  };
}
