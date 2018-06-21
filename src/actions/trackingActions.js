import * as types from "./actionTypes";
import trackingApi from "../api/mockTrackingApi";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";
import { loadUpdatedAggregates } from "./dashboardActions";

export function loadTrackingsSuccess(trackings) {
  return { type: types.LOAD_TRACKINGS_SUCCESS, trackings };
}

export function createTrackingSuccess(createdTracking) {
  return { type: types.CREATE_TRACKING_SUCCESS, createdTracking };
}

export function updateTrackingSuccess(updatedTracking) {
  return { type: types.UPDATE_TRACKING_SUCCESS, updatedTracking };
}

export function deleteTrackingSuccess(deletedTracking) {
  return { type: types.DELETE_TRACKING_SUCCESS, deletedTracking };
}

export function loadTrackings() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return trackingApi
      .getAllTrackings()
      .then(trackings => {
        dispatch(loadTrackingsSuccess(trackings));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveTracking(tracking) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return trackingApi
      .saveTracking(tracking)
      .then(savedTracking => {
        tracking.id
          ? dispatch(updateTrackingSuccess(savedTracking))
          : dispatch(createTrackingSuccess(savedTracking));
        dispatch(loadUpdatedAggregates());
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}

export function deleteTracking(tracking) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return trackingApi
      .deleteTracking(tracking.id)
      .then(deletedTracking => {
          dispatch(deleteTrackingSuccess(deletedTracking));
          dispatch(loadUpdatedAggregates());
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}
