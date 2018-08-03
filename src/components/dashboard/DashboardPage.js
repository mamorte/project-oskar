import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardActions from "../../actions/dashboardActions";
import DashboardTable from "./DashboardTable";
import StackedBarChart from "./StackedBarChart";
import SimpleLineChart from "./SimpleLineChart";
import _ from "lodash";
import { getFormattedDate } from "../../utils/dateHelper";

export class DashboardPage extends React.Component {

    render() {
      const { aggregates } = this.props;
      const { assets } = this.props;

      let groupedAggregates = GroupTrackings(aggregates);
      return (
        <div>
          <h1>Dashboard</h1>
          <table>
            <tbody>
            <tr>
                <td colSpan="2"><DashboardTable rows={aggregates} assets={assets} /></td>
            </tr>
            <tr>
              <td><StackedBarChart data={groupedAggregates} /></td>
              <td><SimpleLineChart data={groupedAggregates} /></td>
            </tr>
            </tbody>
          </table>
        </div>
      );
    }
}

function GroupTrackings(allTrackings) {
  var trackingsByTime = _.groupBy(allTrackings, "trackingTime");
  //console.log(JSON.stringify(trackingsByTime));

  let final = [];

  for (var time in trackingsByTime) {
    let totalCostPrice = 0;
    let totalMarketPrice = 0;
    let totalYieldValue = 0;
    trackingsByTime[time].forEach(tracking => {
      totalCostPrice = totalCostPrice + tracking.costPrice;
      totalMarketPrice = totalMarketPrice + tracking.marketPrice;
      totalYieldValue = totalYieldValue + tracking.yieldValue;
    });
    final.push({
      "trackingTime": time,
      "trackingTimeShort": getFormattedDate(new Date(time)),
      "costPrice": totalCostPrice,
      "marketPrice": totalMarketPrice,
      "yieldValue": totalYieldValue,
      "yieldPercent": (totalYieldValue / totalCostPrice) * 100,
      "children": trackingsByTime[time]
    });
  }

  final.sort(function(a, b){
    var x = a.trackingTimeShort.toLowerCase();
    var y = b.trackingTimeShort.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });
  //console.log(JSON.stringify(final));
  return final;
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
