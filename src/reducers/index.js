import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import aggregates from "./dashboardReducer";
import trackings from "./trackingReducer";
import assets from "./assetReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";

const rootReducer = combineReducers({
  aggregates,
  trackings,
  assets,
  ajaxCallsInProgress,
  routing: routerReducer
});

export default rootReducer;
