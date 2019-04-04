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
  heatmapVisible: boolean;
  setHeatmapVisible: (visible: boolean) => void;
  radius: number;
  setRadius: (radius: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
}

const Filter = (props: FilterProps) => {
  const {
    heatmapVisible,
    setHeatmapVisible,
    radius,
    setRadius,
    opacity,
    setOpacity
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.gridWrapper}>
      <FormControl variant="outlined">
        <InputLabel>Radius</InputLabel>
        <Select
          input={<OutlinedInput labelWidth={92} />}
          value={radius}
          onChange={e => setRadius(Number(e.target.value))}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>

      <TextField
        variant="outlined"
        label="Deckkraft"
        value={opacity}
        type="number"
        inputProps={{ min: 0.1, max: 1, step: 0.1 }}
        onChange={e => setOpacity(Number(e.target.value))}
      />

      <Paper style={{ textAlign: "center" }} elevation={1}>
        <FormControlLabel
          style={{ marginTop: 4 }}
          label="Sichtbarkeit"
          control={
            <Switch
              checked={heatmapVisible}
              onChange={() => setHeatmapVisible(!heatmapVisible)}
              color="primary"
            />
          }
        />
      </Paper>
    </div>
  );
};

const useStyles = makeStyles({
  gridWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "16px",
    maxWidth: window.innerWidth * 0.9,
    margin: "auto",
    marginTop: 32
  }
});

export default Filter;
