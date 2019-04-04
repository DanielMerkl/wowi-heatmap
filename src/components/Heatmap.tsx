import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import { Paper, CircularProgress } from "@material-ui/core";

// @ts-ignore
import GoogleMapReact from "google-map-react";

import Api from "../utils/Api";
import { HeatmapData } from "../types/heatmapData";
import { initialHeatmap } from "../utils/initialHeatmap";
import { MAPS_API_KEY } from "../utils/mapsApiKey";

const Heatmap = () => {
  const ergoStandort = { lat: 51.2366927, lng: 6.7754234 };
  const classes = useStyles();

  const [heatmapData, setHeatmapData] = useState<HeatmapData>({
    ...initialHeatmap
  });
  const [loading, setLoading] = useState(false);

  const fetchHeatmap = async () => {
    try {
      setLoading(true);
      // const response = await Api.fetchHeatmap();
      // TODO: heatmapData setzen
      setHeatmapData({ ...initialHeatmap });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  console.log("heatmapData: ", heatmapData.positions);

  useEffect(() => {
    fetchHeatmap();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper className={classes.wrapper}>
      <GoogleMapReact
        defaultCenter={ergoStandort}
        defaultZoom={14}
        bootstrapURLKeys={{
          key: MAPS_API_KEY,
          // key: "xxx",
          libraries: "visualization"
        }}
        heatmapLibrary
        heatmap={heatmapData}
        yesIWantToUseGoogleMapApiInternals
      />
    </Paper>
  );
};

const useStyles = makeStyles({
  wrapper: {
    height: 600,
    minHeight: 300,
    maxWidth: window.innerWidth * 0.9,
    minWidth: 600,
    margin: "auto",
    marginTop: 48
  }
});

export default Heatmap;
