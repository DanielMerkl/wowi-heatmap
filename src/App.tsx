import React from "react";

import { MuiThemeProvider } from "@material-ui/core";

import SimpleAppBar from "./components/SimpleAppBar";
import Heatmap from "./components/Heatmap";
import theme from "./utils/theme";

const App = () => (
  <MuiThemeProvider theme={theme}>
    <SimpleAppBar />
    <Heatmap />
  </MuiThemeProvider>
);

export default App;
