import React from "react";
import PropTypes from "prop-types";
import { getFormattedDate } from "../../utils/dateHelper";

const DashboardTableRow = ({ row, assetName }) => {
  return (
    <tr>
      <td>{getFormattedDate(row.trackingTime)}</td>
      <td>{assetName}</td>
      <td>{row.costPrice}</td>
      <td>{row.marketPrice}</td>
    </tr>
  );
};

DashboardTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  assetName: PropTypes.string
};

export default DashboardTableRow;
