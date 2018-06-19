import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AssetForm = ({
  asset,
  onChange,
  onSave,
  onDelete,
  saving,
  deleting,
  errors
}) => {
  return (
    <form>
      <h1>Manage Asset</h1>
      <TextInput
        name="ticker"
        label="Ticker"
        value={asset.ticker}
        onChange={onChange}
        error={errors.ticker}
      />
      <TextInput
        name="name"
        label="Name"
        value={asset.name}
        onChange={onChange}
        error={errors.name}
      />
      <TextInput
        name="url"
        label="Url"
        value={asset.url}
        onChange={onChange}
        error={errors.url}
      />
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

AssetForm.propTypes = {
  asset: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  deleting: PropTypes.bool,
  errors: PropTypes.object
};

export default AssetForm;
