import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as assetActions from "../../actions/assetActions";
import AssetForm from "./AssetForm";
import toastr from "toastr";

class ManageAssetPage extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      asset: Object.assign({}, this.props.asset),
      errors: {},
      saving: false,
      deleting: false
    };

    this.updateAsset = this.updateAsset.bind(this);
    this.saveAsset = this.saveAsset.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);
  }

  updateAsset(event) {
    const field = event.target.name;
    let asset = this.state.asset;
    asset[field] = event.target.value;
    return this.setState({ asset: asset });
  }

  saveAsset(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions
      .saveAsset(this.state.asset)
      .then(() => this.redirectSave())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  deleteAsset(event) {
    event.preventDefault();
    this.setState({ deleting: true });
    this.props.actions
      .deleteAsset(this.state.asset)
      .then(() => this.redirectDelete())
      .catch(error => {
        toastr.error(error);
        this.setState({ deleting: false });
      });
  }

  redirectSave() {
    this.setState({ saving: false });
    toastr.success("Asset saved");
    this.context.router.history.push("/assets");
  }

  redirectDelete() {
    this.setState({ deleting: false });
    toastr.success("Asset deleted");
    this.context.router.history.push("/assets");
  }

  render() {
    return (
      <AssetForm
        asset={this.state.asset}
        onChange={this.updateAsset}
        onSave={this.saveAsset}
        onDelete={this.deleteAsset}
        saving={this.state.saving}
        deleting={this.state.deleting}
        errors={this.state.errors}
      />
    );
  }
}

ManageAssetPage.propTypes = {
  asset: PropTypes.object,
  actions: PropTypes.object.isRequired
};

function getAssetById(assets, id) {
  const asset = assets.filter(asset => asset.id == id);
  if (asset.length) return asset[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const assetId = ownProps.match.params.id;

  let asset = {
    id: "",
    ticker: "",
    name: "",
    url: ""
  };
  if (assetId) {
    asset = getAssetById(state.assets, assetId);
  }

  return {
    asset: asset
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(assetActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAssetPage);
