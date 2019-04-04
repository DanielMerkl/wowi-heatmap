import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";

import { HeatmapData } from "../types/HeatmapData";
import { ergoStandort } from "../utils/ergoStandort";

export interface HeatmapProps {
  heatmapData: HeatmapData;
  setHeatmap: (heatmap: any) => void;
  setRadius: (radius: number) => void;
  setOpacity: (opacity: number) => void;
}

const Heatmap = (props: HeatmapProps) => {
  const classes = useStyles();

  useEffect(() => {
    console.log("mounting map...");
    // @ts-ignore
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: ergoStandort,
      zoom: 14
    });

    // @ts-ignore
    const heatmap = new window.google.maps.visualization.HeatmapLayer({
      data: mapData(),
      map: map
    });

    props.setHeatmap(heatmap);
  }, []);

  const mapData = () => {
    return props.heatmapData.positions.map(
      value =>
        // @ts-ignore
        new window.google.maps.LatLng(value.lat, value.lng)
    );
  };

  return (
    <Paper className={classes.wrapper}>
      <div id="map" className={classes.wrapper} />
    </Paper>
  );
};

const useStyles = makeStyles({
  wrapper: {
    height: 600,
    minHeight: 300,
    width: window.innerWidth * 0.9,
    minWidth: 600,
    margin: "auto",
    marginTop: 16
  }
});

export default Heatmap;
