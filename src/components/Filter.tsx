import React from "react";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Switch,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export interface FilterProps {
  radius: number;
  setRadius: (radius: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  filterFirmenname: string;
  setFilterFirmenname: (firmenname: string) => void;
  filterSchadensart: string;
  setFilterSchadensart: (schadensart: string) => void;
  datstellungsart: string;
  setDarstellungsart: (darstellungsart: string) => void;
}

const Filter = (props: FilterProps) => {
  const {
    radius,
    setRadius,
    opacity,
    setOpacity,
    filterFirmenname,
    setFilterFirmenname,
    filterSchadensart,
    setFilterSchadensart,
    datstellungsart,
    setDarstellungsart
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.gridWrapper}>
      <FormControl variant="outlined">
        <InputLabel>Darstellungsart</InputLabel>
        <Select
          input={<OutlinedInput labelWidth={110} />}
          value={datstellungsart}
          onChange={e => {
            setFilterSchadensart("");
            setFilterFirmenname("");
            setDarstellungsart(e.target.value);
          }}
        >
          <MenuItem value={"Versicherte Gebäude"}>Versicherte Gebäude</MenuItem>
          <MenuItem value={"Schäden"}>Schäden</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" disabled={datstellungsart === "Schäden"}>
        <InputLabel>Firmenname</InputLabel>
        <Select
          input={<OutlinedInput labelWidth={92} />}
          value={filterSchadensart}
          onChange={e => setFilterSchadensart(e.target.value)}
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

      <FormControl
        variant="outlined"
        disabled={datstellungsart === "Versicherte Gebäude"}
      >
        <InputLabel>Schadensart</InputLabel>
        <Select
          input={<OutlinedInput labelWidth={92} />}
          value={filterFirmenname}
          onChange={e => setFilterFirmenname(e.target.value)}
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
        value={radius === 0 ? "" : radius}
        type="number"
        inputProps={{ min: 1, step: 1 }}
        onChange={e => setRadius(Number(e.target.value))}
      />

      <TextField
        variant="outlined"
        label="Deckkraft"
        value={opacity}
        type="number"
        inputProps={{ min: 0.1, max: 1, step: 0.1 }}
        onChange={e => setOpacity(Number(e.target.value))}
      />
    </div>
  );
};

const useStyles = makeStyles({
  gridWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridGap: "16px",
    maxWidth: window.innerWidth * 0.9,
    margin: "auto",
    marginTop: 32
  }
});

export default Filter;
