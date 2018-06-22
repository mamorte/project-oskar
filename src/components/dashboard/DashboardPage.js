import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardActions from "../../actions/dashboardActions";
import DashboardTable from "./DashboardTable";

export class DashboardPage extends React.Component {

    render() {
      const { aggregates } = this.props;
      const { assets } = this.props;
      return (
        <div>
          <h1>Dashboard</h1>
          <br /><br />
          <DashboardTable rows={aggregates} assets={assets} />
        </div>
      );
    }
}

    DashboardPage.propTypes = {
      aggregates: PropTypes.array.isRequired,
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
        aggregates: state.aggregates,
        assets: assetObjects
      };
    }

    function mapDispatchToProps(dispatch) {
      return {
        actions: bindActionCreators(dashboardActions, dispatch)
      };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
