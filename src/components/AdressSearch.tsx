import React, { ChangeEvent, useState } from "react";

import { Button, CircularProgress, TextField } from "@material-ui/core";
import { GpsFixed } from "@material-ui/icons";
import { Coordinate } from "../types/Coordinate";
import { makeStyles } from "@material-ui/styles";
import { ERGO_ROT } from "../utils/colors";

export interface AdressSearchProps {
  marker: any;
  setCenter: (coordinate: Coordinate) => void;
  removeMarker: () => void;
  adresse: string;
  handleAdresseChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  handleReset: () => void;
  loading: boolean;
}

const AdressSearch = (props: AdressSearchProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        style={{ width: 300 }}
        label="Adresse"
        value={props.adresse}
        onChange={props.handleAdresseChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            props.handleSearch();
          }
        }}
      />
      <div style={{ position: "relative" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={props.handleSearch}
          style={{ marginTop: 12, marginLeft: 8 }}
          disabled={props.loading}
        >
          <GpsFixed style={{ marginRight: 16 }} />
          Suchen
        </Button>
        {props.loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        {props.marker !== null && (
          <Button
            style={{ marginTop: 12, marginLeft: 8 }}
            variant="outlined"
            color="primary"
            onClick={props.handleReset}
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
