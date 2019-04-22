import React, { FC } from "react";
import { LinearProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { AppState } from "../store/stors";

interface StateProps {
  loadingBestaende: boolean;
  loadingSchaeden: boolean;
}

type LoadingIndicatorProps = StateProps;

const LoadingIndicator: FC<LoadingIndicatorProps> = props => (
  <div style={{ height: 1 }}>
    {(props.loadingBestaende || props.loadingSchaeden) && <LinearProgress />}
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  loadingBestaende: state.data.loadingBestaende,
  loadingSchaeden: state.data.loadingSchaeden
});

export default connect(mapStateToProps)(LoadingIndicator);
