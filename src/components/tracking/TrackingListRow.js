import React from "react";
import PropTypes from "prop-types";
import LinkButton from "../common/LinkButton";
import { getFormattedDate } from "../../utils/dateHelper";

const TrackingListRow = ({ tracking, assetName }) => {
  return (
    <tr>
      <td>
        <LinkButton
          className="btn btn-primary"
          to={"/managetracking/" + tracking.id}
          text="Edit"
        />
      </td>
      <td>{getFormattedDate(tracking.trackingTime)}</td>
      <td>{assetName}</td>
      <td>{tracking.costPrice}</td>
      <td>{tracking.marketPrice}</td>
    </tr>
  );
};

TrackingListRow.propTypes = {
  tracking: PropTypes.object.isRequired,
  assetName: PropTypes.string
};

export default TrackingListRow;
