/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch/*, withRouter*/ } from "react-router-dom";

import AssetPage from "./asset/AssetPage";
import ManageAssetPage from "./asset/ManageAssetPage";
import TrackingPage from "./tracking/TrackingPage";
import ManageTrackingPage from "./tracking/ManageTrackingPage";
//import LoadingDots from "./common/LoadingDots";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
//import { connect } from "react-redux";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
      return (
      <div>
        <div>
          <NavLink exact to="/trackings" activeStyle={{ color: "blue" }}>Trackings</NavLink>
          {" | "}
          <NavLink to="/assets" activeStyle={{ color: "blue" }}>Assets</NavLink>
          {/*this.props.loading > 0 && <LoadingDots interval={100} dots={20} />*/}
        </div>
        <Switch>
          <Route exact path="/trackings" component={TrackingPage} />
          <Route path="/tracking" component={ManageTrackingPage} />
          <Route path="/managetracking/:id" component={ManageTrackingPage} />
          <Route path="/assets" component={AssetPage} />
          <Route path="/asset" component={ManageAssetPage} />
          <Route path="/manageasset/:id" component={ManageAssetPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

/*
function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

App.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default withRouter(connect(mapStateToProps)(App));
*/

export default hot(module)(App);
//export default hot(mapStateToProps)(App);
