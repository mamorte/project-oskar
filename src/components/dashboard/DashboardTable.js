import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from "lodash";
import { getFormattedDate } from "../../utils/dateHelper";

const DashboardTable = ({ rows, assets }) => {
  return (
    <div>
      <ReactTable
        data={rows}
        columns={[
          {
            Header: "Tracking Time",
            id: "trackingTime",
            accessor: d => {
              let theDate = getFormattedDate(d.trackingTime);
              if (theDate.length) return theDate;
            },
            width: 100
          },
          {
            Header: "Asset",
            id: "assetId",
            accessor: d => {
              let asset = assets.filter(asset => asset.value == d.assetId);
              if (asset.length) return asset[0].text;
            },
            width: 500
          },
          {
            Header: "Cost Price",
            accessor: "costPrice",
            aggregate: vals => _.sum(vals),
            width: 100
          },
          {
            Header: "Market Price",
            accessor: "marketPrice",
            aggregate: vals => _.sum(vals),
            width: 100
          },
          {
            Header: "Yield",
            accessor: "yieldValue",
            aggregate: vals => _.sum(vals),
            width: 100
          },
          {
            Header: "Yield Percent",
            accessor: "yieldPercent",
            aggregate: vals => _.mean(vals),
            width: 100
          }
        ]}
        pivotBy={["trackingTime"]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  );
};

DashboardTable.propTypes = {
  rows: PropTypes.array.isRequired,
  assets: PropTypes.array.isRequired
};

export default DashboardTable;
