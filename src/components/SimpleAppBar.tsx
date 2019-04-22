import React, { FC } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { ERGO_HELLBLAU, ERGO_ROT } from "../utils/colors";

const SimpleAppBar: FC = () => (
  <AppBar position="static" style={{ background: ERGO_HELLBLAU }}>
    <Toolbar variant="dense">
      <Typography variant="h6" style={{ color: ERGO_ROT }}>
        WoWi Heatmap
      </Typography>
    </Toolbar>
  </AppBar>
);

export default SimpleAppBar;
