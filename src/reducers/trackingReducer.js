import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function trackingReducer(
  state = initialState.trackings,
  action
) {
  switch (action.type) {
    case types.LOAD_TRACKINGS_SUCCESS:
      return action.trackings;

    case types.CREATE_TRACKING_SUCCESS:
      return [...state, Object.assign({}, action.createdTracking)];

    case types.UPDATE_TRACKING_SUCCESS:
      return [
        ...state.filter(tracking => tracking.id != action.updatedTracking.id),
        Object.assign({}, action.updatedTracking)
      ];

    case types.DELETE_TRACKING_SUCCESS:
      return [
        ...state.filter(tracking => tracking.id != action.deletedTracking)
      ];

    default:
      return state;
  }
}
