import React, { ChangeEvent, useState } from "react";

import { Button, CircularProgress, TextField } from "@material-ui/core";
import { GpsFixed } from "@material-ui/icons";
import { GEOCODE_BASE_URL, MAPS_API_KEY } from "../utils/mapsApi";
import { Coordinate } from "../types/Coordinate";
import { makeStyles } from "@material-ui/styles";
import { ERGO_ROT } from "../utils/colors";

export interface AdressSearchProps {
  marker: any;
  setCenter: (coordinate: Coordinate) => void;
  removeMarker: () => void;
}

const AdressSearch = (props: AdressSearchProps) => {
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
        throw new Error("Es konnten keine Koordinaten gefunden werden!");
      }

      const coordinate: Coordinate = { ...data.results[0].geometry.location };
      props.setCenter(coordinate);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleZuruecksetzen = () => {
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
          Prüfen
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        {props.marker !== null && (
          <Button
            style={{ marginTop: 12, marginLeft: 8 }}
            variant="outlined"
            color="primary"
            onClick={handleZuruecksetzen}
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

export default AdressSearch;
