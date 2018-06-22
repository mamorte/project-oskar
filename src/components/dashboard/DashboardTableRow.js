import React from "react";
import PropTypes from "prop-types";
import { getFormattedDate } from "../../utils/dateHelper";

const DashboardTableRow = ({ row, assetName }) => {
  let costPrice = row.costPrice.toLocaleString('no-NO', { style: 'currency', currency: 'NOK' });
  let marketPrice = row.marketPrice.toLocaleString('no-NO', { style: 'currency', currency: 'NOK' });
  let yieldValue = row.yieldValue.toLocaleString('no-NO', { style: 'currency', currency: 'NOK' });
  let yieldPercent = row.yieldPercent.toLocaleString('no-NO', { style: 'percent'});
  return (
    <tr>
      <td>{getFormattedDate(row.trackingTime)}</td>
      <td>{assetName}</td>
      <td>{costPrice}</td>
      <td>{marketPrice}</td>
      <td>{yieldValue}</td>
      <td>{yieldPercent}</td>
    </tr>
  );
};

DashboardTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  assetName: PropTypes.string
};

export default DashboardTableRow;
