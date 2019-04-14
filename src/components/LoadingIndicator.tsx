import React from "react";
import { LinearProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { AppState } from "../store/stors";

interface LoadingIndicatorProps {
  loadingBestaende: boolean;
  loadingSchaeden: boolean;
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {
  return (
    <div style={{ height: 1 }}>
      {(props.loadingBestaende || props.loadingSchaeden) && <LinearProgress />}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  loadingBestaende: state.data.loadingBestaende,
  loadingSchaeden: state.data.loadingSchaeden
});

export default connect(mapStateToProps)(LoadingIndicator);
