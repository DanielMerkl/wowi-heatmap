import React, { useState } from "react";

import { MuiThemeProvider } from "@material-ui/core";

import SimpleAppBar from "./components/SimpleAppBar";
import Heatmap from "./components/Heatmap";
import theme from "./utils/theme";
import Filter from "./components/Filter";

const App = () => {
  const [heatmapVisible, setHeatmapVisible] = useState(false);
  const [radius, setRadius] = useState(20);
  const [opacity, setOpacity] = useState(1);

  return (
    <MuiThemeProvider theme={theme}>
      <SimpleAppBar />
      <Filter
        heatmapVisible={heatmapVisible}
        setHeatmapVisible={setHeatmapVisible}
        radius={radius}
        setRadius={setRadius}
        opacity={opacity}
        setOpacity={setOpacity}
      />
      <Heatmap />
    </MuiThemeProvider>
  );
};

export default App;
