import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function dashboardReducer(
  state = initialState.aggregates,
  action
) {
  switch (action.type) {
    case types.LOAD_DASHBOARD_SUCCESS:
      return action.aggregates;
      
    default:
      return state;
  }
}
