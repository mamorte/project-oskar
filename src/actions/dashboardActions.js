import * as types from "./actionTypes";
import trackingApi from "../api/mockTrackingApi";
import dashboardApi from "../api/mockDashboardApi";
import { beginAjaxCall } from "./ajaxStatusActions";

export function loadDashboardSuccess(dashboard) {
    return { type: types.LOAD_DASHBOARD_SUCCESS, dashboard };
  }

export function loadDashboard() {
  return dispatch => {
    dispatch(beginAjaxCall());
        //trackingApi.getAllTrackings()
        //.then(trackings => {
            //dashboardApi.aggregateTrackings(trackings);
        //})
        dashboardApi.aggregateTrackings()
      .then(aggregates => {
        dispatch(loadDashboardSuccess(aggregates));
      })
      .catch(error => {
        throw error;
      });
  };
}
