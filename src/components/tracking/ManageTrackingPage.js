import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as trackingActions from "../../actions/trackingActions";
import TrackingForm from "./TrackingForm";
import toastr from "toastr";

class ManageTrackingPage extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      tracking: Object.assign({}, this.props.tracking),
      errors: {},
      saving: false,
      deleting: false
    };

    this.updateTracking = this.updateTracking.bind(this);
    this.saveTracking = this.saveTracking.bind(this);
    this.deleteTracking = this.deleteTracking.bind(this);
  }

  updateTracking(event) {
    const field = event.target.name;
    let tracking = this.state.tracking;
    tracking[field] = event.target.value;
    return this.setState({ tracking: tracking });
  }

  saveTracking(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions
      .saveTracking(this.state.tracking)
      .then(() => this.redirectSave())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  deleteTracking(event) {
    event.preventDefault();
    this.setState({ deleting: true });
    this.props.actions
      .deleteTracking(this.state.tracking)
      .then(() => this.redirectDelete())
      .catch(error => {
        toastr.error(error);
        this.setState({ deleting: false });
      });
  }

  redirectSave() {
    this.setState({ saving: false });
    toastr.success("Tracking saved");
    this.context.router.history.push("/trackings");
  }

  redirectDelete() {
    this.setState({ deleting: false });
    toastr.success("Tracking deleted");
    this.context.router.history.push("/trackings");
  }

  render() {
    return (
      <TrackingForm
        tracking={this.state.tracking}
        allAssets={this.props.assets}
        onChange={this.updateTracking}
        onSave={this.saveTracking}
        onDelete={this.deleteTracking}
        saving={this.state.saving}
        deleting={this.state.deleting}
        errors={this.state.errors}
      />
    );
  }
}

ManageTrackingPage.propTypes = {
  tracking: PropTypes.object,
  assets: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getTrackingById(trackings, id) {
  const tracking = trackings.filter(tracking => tracking.id == id);
  if (tracking.length) return tracking[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const trackingId = ownProps.match.params.id;

  let tracking = {
    id: "",
    assetId: "",
    costPrice: "",
    marketPrice: "",
    trackingTime: ""
  };
  if (trackingId) {
    tracking = getTrackingById(state.trackings, trackingId);
  }

  const assetsFormattedForSelect = state.assets.map(asset => {
    return {
      value: asset.id,
      text: asset.name
    };
  });

  return {
    tracking: tracking,
    assets: assetsFormattedForSelect
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(trackingActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTrackingPage);
