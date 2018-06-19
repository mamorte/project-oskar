import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const TrackingForm = ({
  tracking,
  allAssets,
  onChange,
  onDateChange,
  onSave,
  onDelete,
  saving,
  deleting,
  errors
}) => {
  return (
    <form>
      <h1>Manage Tracking</h1>
      <SelectInput
        name="assetId"
        label="Asset"
        value={tracking.assetId}
        defaultOption="Select Asset"
        options={allAssets}
        onChange={onChange}
        error={errors.assetId}
      />
      <br />
      <TextInput
        name="costPrice"
        label="Cost Price"
        value={tracking.costPrice}
        onChange={onChange}
        error={errors.costPrice}
      />
      <br />
      <TextInput
        name="marketPrice"
        label="Market Price"
        value={tracking.marketPrice}
        onChange={onChange}
        error={errors.marketPrice}
      />
      <br />
      <DayPickerInput
        value={tracking.trackingTime}
        onDayChange={onDateChange}
      />
      <br />
      <input
        type="submit"
        disabled={saving}
        value={saving ? "Saving..." : "Save"}
        className="btn btn-primary"
        onClick={onSave}
      />
      <input
        type="submit"
        disabled={deleting}
        value={deleting ? "Deleting..." : "Delete"}
        className="btn btn-primary"
        onClick={onDelete}
      />
    </form>
  );
};

TrackingForm.propTypes = {
  tracking: PropTypes.object.isRequired,
  allAssets: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  deleting: PropTypes.bool,
  errors: PropTypes.object
};

export default TrackingForm;
