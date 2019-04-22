import React, { ChangeEvent, FC, useState } from "react";

import { Button, CircularProgress, TextField } from "@material-ui/core";
import { GpsFixed } from "@material-ui/icons";
import { Coordinate } from "../types/Coordinate";
import { makeStyles } from "@material-ui/styles";
import { ERGO_ROT } from "../utils/colors";
import { GEOCODE_BASE_URL, MAPS_API_KEY } from "../utils/mapsApi";
import { AppActions, AppState } from "../store/stors";
import { Dispatch } from "redux";
import { removeMarkerAction, setCenterAction } from "../store/map/mapActions";
import { connect } from "react-redux";

interface StateProps {
  marker: any;
}

interface DispatchProps {
  setCenter: (coordinate: Coordinate) => void;
  removeMarker: () => void;
}

type AdressSearchProps = StateProps & DispatchProps;

const AdressSearch: FC<AdressSearchProps> = props => {
  const classes = useStyles();

  const [adresse, setAdresse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdresseChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" && props.marker !== null) {
      props.removeMarker();
    }
    setAdresse(e.target.value);
  };

  const handleSearch = async () => {
    if (adresse === "") {
      return;
    }

    try {
      setLoading(true);

      const parameter = adresse.replace(" ", "+");
      const url = `${GEOCODE_BASE_URL}${parameter}&key=${MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length <= 0) {
        console.error("Es konnten keine Koordinaten gefunden werden!");
      } else {
        const coordinate: Coordinate = { ...data.results[0].geometry.location };
        props.setCenter(coordinate);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    props.removeMarker();
    setAdresse("");
  };

  return (
    <div className={classes.root}>
      <TextField
        style={{ width: 300 }}
        label="Adresse"
        value={adresse}
        onChange={handleAdresseChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <div style={{ position: "relative" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSearch}
          style={{ marginTop: 12, marginLeft: 8 }}
          disabled={loading}
        >
          <GpsFixed style={{ marginRight: 16 }} />
          Suchen
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        {props.marker !== null && (
          <Button
            style={{ marginTop: 12, marginLeft: 8 }}
            variant="outlined"
            color="primary"
            onClick={handleReset}
          >
            Zurücksetzen
          </Button>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    paddingLeft: window.innerWidth * 0.05,
    marginTop: 16,
    display: "flex"
  },
  buttonProgress: {
    color: ERGO_ROT,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -6,
    marginLeft: -6
  }
});

const mapStateToProps = (state: AppState): StateProps => ({
  marker: state.map.marker
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>): DispatchProps => ({
  setCenter: (coordinate: Coordinate) => dispatch(setCenterAction(coordinate)),
  removeMarker: () => dispatch(removeMarkerAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdressSearch);
