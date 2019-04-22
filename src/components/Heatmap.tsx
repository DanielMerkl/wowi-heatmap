import React, { FC } from "react";

import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";

const Heatmap: FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.wrapper}>
      <div id="map" className={classes.map} />
    </Paper>
  );
};

const useStyles = makeStyles({
  wrapper: {
    height: "calc(100vh - 184px)",
    width: "100%",
    minWidth: "500px",
    margin: "auto",
    marginTop: 16
  },
  map: {
    height: "100%",
    width: "100%"
  }
});

export default Heatmap;
