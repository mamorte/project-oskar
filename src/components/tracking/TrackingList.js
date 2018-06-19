import React from "react";
import PropTypes from "prop-types";
import TrackingListRow from "./TrackingListRow";

function getAssetName(assets, assetId) {
  const asset = assets.filter(asset => asset.value == assetId);
  if (asset.length) return asset[0].text;
  return null;
}

const TrackingList = ({ trackings, assets }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Tracking Date</th>
          <th>Asset</th>
          <th>Cost Price</th>
          <th>Market Price</th>
        </tr>
      </thead>
      <tbody>
        {trackings.map(tracking => (
          <TrackingListRow
            key={tracking.id}
            tracking={tracking}
            assetName={getAssetName(assets, tracking.assetId)}
          />
        ))}
      </tbody>
    </table>
  );
};

TrackingList.propTypes = {
  trackings: PropTypes.array.isRequired,
  assets: PropTypes.array.isRequired
};

export default TrackingList;
