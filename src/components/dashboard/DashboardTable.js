import React from "react";
import PropTypes from "prop-types";
import DashboardTableRow from "./DashboardTableRow";

function getAssetName(assets, assetId) {
  const asset = assets.filter(asset => asset.value == assetId);
  if (asset.length) return asset[0].text;
  return null;
}

const DashboardTable = ({ rows, assets }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Tracking Date</th>
          <th>Asset</th>
          <th>Cost Price</th>
          <th>Market Price</th>
          <th>Diff</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <DashboardTableRow
            key={row.id}
            row={row}
            assetName={getAssetName(assets, row.assetId)}
          />
        ))}
      </tbody>
    </table>
  );
};

DashboardTable.propTypes = {
  rows: PropTypes.array.isRequired,
  assets: PropTypes.array.isRequired
};

export default DashboardTable;
