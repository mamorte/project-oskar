import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardActions from "../../actions/dashboardActions";
import DashboardTable from "./DashboardTable";
import StackedBarChart from "./StackedBarChart";
import SimpleLineChart from "./SimpleLineChart";

export class DashboardPage extends React.Component {

    render() {
      const { aggregates } = this.props;
      const { assets } = this.props;
      return (
        <div>
          <h1>Dashboard</h1>
          <table>
            <tbody>
            <tr>
                <td colSpan="2"><DashboardTable rows={aggregates} assets={assets} /></td>
            </tr>
            <tr>
              <td><StackedBarChart data={aggregates} /></td>
              <td><SimpleLineChart data={aggregates} /></td>
            </tr>
            </tbody>
          </table>
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
