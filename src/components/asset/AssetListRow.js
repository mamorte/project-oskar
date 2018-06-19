import React from "react";
import PropTypes from "prop-types";
import LinkButton from "../common/LinkButton";

const AssetListRow = ({ asset }) => {
  return (
    <tr>
      <td>
        <LinkButton
          className="btn btn-primary"
          to={"/manageasset/" + asset.id}
          text="Edit"
        />
      </td>
      <td>{asset.ticker}</td>
      <td>{asset.name}</td>
      <td>
        <a href={asset.url} target="_blank">
          {asset.url}
        </a>
      </td>
    </tr>
  );
};

AssetListRow.propTypes = {
  asset: PropTypes.object.isRequired
};

export default AssetListRow;
