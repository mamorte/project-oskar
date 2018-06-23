import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash'

const DashboardTable = ({ rows, assets }) => {
  return (
    <div>
    <ReactTable
      data={rows}
      columns={[
        {
          Header: "Time and Assets",
          columns: [
            {
              Header: "Tracking Time",
              accessor: "trackingTime"
            },
            {
              Header: "Asset",
              id: "assetId",
              accessor: d => { let asset = assets.filter(asset => asset.value == d.assetId); if(asset.length) return asset[0].text; }
            }
          ]
        },
        {
          Header: "Price and Yield",
          columns: [
            {
              Header: "Cost Price",
              accessor: "costPrice",
              aggregate: vals => _.sum(vals)
            },
            {
              Header: "Market Price",
              accessor: "marketPrice",
              aggregate: vals => _.sum(vals)
            },
            {
              Header: "Yield Value",
              accessor: "yieldValue",
              aggregate: vals => _.sum(vals)
            }
          ]
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
