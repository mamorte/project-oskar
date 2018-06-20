import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardActions from "../../actions/dashboardActions";
import DashboardTable from "./DashboardTable";

export class DashboardPage extends React.Component {

    render() {
      const { trackings } = this.props;
      const { assets } = this.props;
      return (
        <div>
          <h1>Dashboard</h1>
          <br /><br />
          <DashboardTable rows={trackings} assets={assets} />
        </div>
      );
    }
}

    DashboardPage.propTypes = {
      trackings: PropTypes.array.isRequired,
      actions: PropTypes.object.isRequired,
      assets: PropTypes.array.isRequired,
    };
    
    function mapStateToProps(state) {
      const assetObjects = state.assets.map(asset => {
        return {
          value: asset.id,
          text: asset.name
        };
      });
    
      return {
        trackings: state.trackings,
        assets: assetObjects
      };
    }
    
    function mapDispatchToProps(dispatch) {
      return {
        actions: bindActionCreators(dashboardActions, dispatch)
      };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
    