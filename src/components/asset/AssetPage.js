import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as assetActions from "../../actions/assetActions";
import AssetList from "./AssetList";
import LinkButton from "../common/LinkButton";

class AssetPage extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  assetRow(asset, index) {
    return <div key={index}>{asset.assetId}</div>;
  }

  render() {
    const { assets } = this.props;
    return (
      <div>
        <h1>Assets</h1>

        <LinkButton className="btn btn-primary" to="/asset" text="Add Asset" />

        <AssetList assets={assets} />
      </div>
    );
  }
}

AssetPage.propTypes = {
  assets: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    assets: state.assets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(assetActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetPage);
