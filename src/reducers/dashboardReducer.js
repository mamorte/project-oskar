import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function dashboardReducer(
  state = initialState.trackings,
  action
) {
  switch (action.type) {
    case types.LOAD_UPDATED_AGGREGATES_SUCCESS:
      return [action.aggregates[0]];
      
    default:
      return state;
  }
}
