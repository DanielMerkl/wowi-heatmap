import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Coordinate } from "../types/Coordinate";
import { Bestand } from "../types/Bestand";
import { Schaden } from "../types/Schaden";
import { AppActions, AppState } from "../store/stors";
import { Dispatch } from "redux";
import {
  setOpacityAction,
  setPointsAction,
  setRadiusAction
} from "../store/map/mapActions";
import { connect } from "react-redux";
import { mapToCoordinates } from "../utils/mapToCoordinates";

interface FilterProps {
  radius: number;
  setRadius: (radius: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  bestaende: Array<Bestand>;
  schaeden: Array<Schaden>;
  setPoints: (points: Array<Coordinate>) => void;
  map: any;
}

const Filter = (props: FilterProps) => {
  const classes = useStyles();

  const [darstellungsart, setDarstellungsart] = useState("Bestand");
  const [filterFirmenname, setFilterFirmenname] = useState("");
  const [filterSchadensart, setFilterSchadensart] = useState("");

  useEffect(() => {
    if (props.map === null) {
      return;
    }

    let filteredData;
    let coordinates: Array<Coordinate>;

    if (darstellungsart === "Bestand") {
      if (filterFirmenname === "") {
        filteredData = props.bestaende;
      } else {
        filteredData = props.bestaende.filter(
          el => el.firma === filterFirmenname
        );
      }
    } else {
      if (filterSchadensart === "") {
        filteredData = props.schaeden;
      } else {
        filteredData = props.schaeden.filter(
          el => el.SchadenCode === filterSchadensart
        );
      }
    }

    coordinates = mapToCoordinates(filteredData);
    props.setPoints(coordinates);
  }, [filterFirmenname, filterSchadensart, darstellungsart]);

  return (
    <div className={classes.gridWrapper}>
      <FormControl variant="outlined">
        <InputLabel>Darstellungsart</InputLabel>
        <Select
          input={<OutlinedInput labelWidth={110} />}
          value={darstellungsart}
          onChange={e => {
            setFilterSchadensart("");
            setFilterFirmenname("");
            setDarstellungsart(e.target.value);
          }}
        >
          <MenuItem value={"Bestand"}>Bestand</MenuItem>
          <MenuItem value={"Schäden"}>Schäden</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" disabled={darstellungsart === "Schäden"}>
        <InputLabel>Firmenname</InputLabel>
        <Select
          input={<OutlinedInput labelWidth={92} />}
          value={filterFirmenname}
          onChange={e => setFilterFirmenname(e.target.value)}
        >
          <MenuItem value={""}>-</MenuItem>
          <MenuItem value={"Fullhouse GmbH"}>Fullhouse GmbH</MenuItem>
          <MenuItem value={"Daystar GmbH"}>Daystar GmbH</MenuItem>
          <MenuItem value={"Wohnzentrum GmbH"}>Wohnzentrum GmbH</MenuItem>
          <MenuItem value={"Flamingo Work GmbH"}>Flamingo Work GmbH</MenuItem>
          <MenuItem value={"Life Architecture GmbH"}>
            Life Architecture GmbH
          </MenuItem>
          <MenuItem value={"Smile Lighting GmbH"}>Smile Lighting GmbH</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" disabled={darstellungsart === "Bestand"}>
        <InputLabel>Schadensart</InputLabel>
        <Select
          input={<OutlinedInput labelWidth={92} />}
          value={filterSchadensart}
          onChange={e => setFilterSchadensart(e.target.value)}
        >
          <MenuItem value={""}>-</MenuItem>
          <MenuItem value={"0001"}>Feuer</MenuItem>
          <MenuItem value={"0002"}>Einbruchdiebstahl</MenuItem>
          <MenuItem value={"0003"}>Leitungswasser</MenuItem>
          <MenuItem value={"0004"}>Sturm</MenuItem>
          <MenuItem value={"0901"}>Vandalismus</MenuItem>
        </Select>
      </FormControl>

      <TextField
        variant="outlined"
        label="Radius"
        value={props.radius === 0 ? "" : props.radius}
        type="number"
        inputProps={{ min: 1, step: 1 }}
        onChange={e => props.setRadius(Number(e.target.value))}
      />

      <TextField
        variant="outlined"
        label="Deckkraft"
        value={props.opacity}
        type="number"
        inputProps={{ min: 0.1, max: 1, step: 0.1 }}
        onChange={e => props.setOpacity(Number(e.target.value))}
      />
    </div>
  );
};

const useStyles = makeStyles({
  gridWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridGap: "16px",
    maxWidth: window.innerWidth * 0.9,
    margin: "auto",
    marginTop: 16
  }
});

const mapStateToProps = (state: AppState) => ({
  radius: state.map.radius,
  opacity: state.map.opacity,
  bestaende: state.data.bestaende,
  schaeden: state.data.schaeden,
  map: state.map.map
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  setRadius: (radius: number) => dispatch(setRadiusAction(radius)),
  setOpacity: (opacity: number) => dispatch(setOpacityAction(opacity)),
  setPoints: (points: Array<Coordinate>) => dispatch(setPointsAction(points))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
