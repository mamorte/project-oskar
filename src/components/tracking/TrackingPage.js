import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as trackingActions from "../../actions/trackingActions";
import TrackingList from "./TrackingList";
import LinkButton from "../common/LinkButton";

class TrackingPage extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  trackingRow(tracking, index) {
    return <div key={index}>{tracking.assetId}</div>;
  }

  render() {
    const { trackings } = this.props;
    const { assets } = this.props;
    return (
      <div>
        <h1>Trackings</h1>

        <LinkButton
          className="btn btn-primary"
          to="/tracking"
          text="Add Tracking"
        />

        <TrackingList trackings={trackings} assets={assets} />
      </div>
    );
  }
}

TrackingPage.propTypes = {
  trackings: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  assets: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const assetObjects = state.assets.map(asset => {
    return {
      value: asset.id,
      text: asset.name
    };
  });

  return {
    trackings: state.trackings,
    assets: assetObjects
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(trackingActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingPage);
