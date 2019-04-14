import React, { useEffect, useState } from "react";

import { LinearProgress } from "@material-ui/core";

import SimpleAppBar from "./components/SimpleAppBar";
import Heatmap from "./components/Heatmap";
import { Schaden } from "./types/Schaden";
import { Bestand } from "./types/Bestand";
import { mapToCoordinates } from "./utils/mapToCoordinates";
import { makeStyles } from "@material-ui/styles";
import { Coordinate } from "./types/Coordinate";
import AdressSearchContainer from "./containers/AdressSearchContainer";
import { connect } from "react-redux";
import { AppActions, AppState } from "./store/stors";
import { initMapsAction, setPointsAction } from "./store/map/mapActions";
import {
  fetchBestaendeAction,
  fetchSchaendenAction
} from "./store/data/dataActions";
import { ThunkDispatch } from "redux-thunk";
import FilterContainer from "./containers/FilterContainer";

interface AppProps {
  initMaps: () => void;
  bestaende: Array<Bestand>;
  schaeden: Array<Schaden>;
  fetchBestaende: () => void;
  fetchSchaeden: () => void;
  loadingBestaende: boolean;
  loadingSchaeden: boolean;
  setPoints: (points: Array<Coordinate>) => void;
}

const App = (props: AppProps) => {
  const classes = useStyles();

  useEffect(() => {
    // fetchData();
    props.initMaps();
    props.fetchBestaende();
    props.fetchSchaeden();
  }, []);

  useEffect(() => {
    const mappedPoints = mapToCoordinates(props.bestaende);
    props.setPoints(mappedPoints);
  }, [props.bestaende]);

  return (
    <>
      <SimpleAppBar />
      <div style={{ height: 1 }}>
        {(props.loadingBestaende || props.loadingSchaeden) && (
          <LinearProgress />
        )}
      </div>
      <AdressSearchContainer />
      <div className={classes.gridWrapper}>
        <Heatmap />
        <FilterContainer />
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

const mapStateToProps = (state: AppState) => ({
  ...state.data
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, null, AppActions>
) => ({
  initMaps: () => dispatch(initMapsAction()),
  fetchBestaende: () => dispatch(fetchBestaendeAction()),
  fetchSchaeden: () => dispatch(fetchSchaendenAction()),
  setPoints: (points: Array<Coordinate>) => dispatch(setPointsAction(points))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
