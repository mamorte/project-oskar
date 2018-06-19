import React from "react";
import PropTypes from "prop-types";
import AssetListRow from "./AssetListRow";

const AssetList = ({ assets }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Ticker</th>
          <th>Name</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {assets.map(asset => <AssetListRow key={asset.id} asset={asset} />)}
      </tbody>
    </table>
  );
};

AssetList.propTypes = {
  assets: PropTypes.array.isRequired
};

export default AssetList;
