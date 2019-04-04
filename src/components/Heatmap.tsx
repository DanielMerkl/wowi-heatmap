import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";

import { ergoStandort } from "../utils/ergoStandort";

export interface HeatmapProps {
  setHeatmap: (heatmap: any) => void;
}

const Heatmap = (props: HeatmapProps) => {
  const classes = useStyles();

  useEffect(() => {
    // @ts-ignore
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: ergoStandort,
      zoom: 13
    });

    // @ts-ignore
    const heatmap = new window.google.maps.visualization.HeatmapLayer({});
    heatmap.setMap(map);
    props.setHeatmap(heatmap);
  }, []);

  return (
    <Paper className={classes.wrapper}>
      <div id="map" className={classes.wrapper} />
    </Paper>
  );
};

const useStyles = makeStyles({
  wrapper: {
    height: "calc(100vh - 184px)",
    width: window.innerWidth * 0.9,
    minWidth: "500px",
    margin: "auto",
    marginTop: 16
  }
});

export default Heatmap;
