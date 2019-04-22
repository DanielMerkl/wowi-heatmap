import React, { FC, useEffect } from "react";

import SimpleAppBar from "./components/SimpleAppBar";
import Heatmap from "./components/Heatmap";
import { Schaden } from "./types/Schaden";
import { Bestand } from "./types/Bestand";
import { mapToCoordinates } from "./utils/mapToCoordinates";
import { makeStyles } from "@material-ui/styles";
import { Coordinate } from "./types/Coordinate";
import { connect } from "react-redux";
import { AppActions, AppState } from "./store/stors";
import { initMapsAction, setPointsAction } from "./store/map/mapActions";
import {
  fetchBestaendeAction,
  fetchSchaendenAction
} from "./store/data/dataActions";
import { ThunkDispatch } from "redux-thunk";
import AdressSearch from "./components/AdressSearch";
import Filter from "./components/Filter";
import LoadingIndicator from "./components/LoadingIndicator";

interface StateProps {
  bestaende: Array<Bestand>;
  schaeden: Array<Schaden>;
}

interface DispatchProps {
  initMaps: () => void;
  fetchBestaende: () => void;
  fetchSchaeden: () => void;
  setPoints: (points: Array<Coordinate>) => void;
}

type AppProps = StateProps & DispatchProps;

const App: FC<AppProps> = props => {
  const classes = useStyles();

  useEffect(() => {
    props.initMaps();
    props.fetchBestaende();
    // props.fetchSchaeden();
  }, []);

  useEffect(() => {
    const mappedPoints = mapToCoordinates(props.bestaende);
    props.setPoints(mappedPoints);
  }, [props.bestaende]);

  return (
    <>
      <SimpleAppBar />
      <LoadingIndicator />
      <AdressSearch />
      <div className={classes.gridWrapper}>
        <Heatmap />
        <Filter />
      </div>
    </>
  );
};

const useStyles = makeStyles({
  gridWrapper: {
    display: "grid",
    gridGap: "16px",
    gridTemplateColumns: "1fr 200px",
    maxWidth: window.innerWidth * 0.9,
    margin: "auto"
  }
});

const mapStateToProps = (state: AppState): StateProps => ({
  bestaende: state.data.bestaende,
  schaeden: state.data.schaeden
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, AppActions>
): DispatchProps => ({
  initMaps: () => dispatch(initMapsAction()),
  fetchBestaende: () => dispatch(fetchBestaendeAction()),
  fetchSchaeden: () => dispatch(fetchSchaendenAction()),
  setPoints: (points: Array<Coordinate>) => dispatch(setPointsAction(points))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
