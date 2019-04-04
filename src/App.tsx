import React, { useEffect, useState } from "react";

import { MuiThemeProvider } from "@material-ui/core";

import SimpleAppBar from "./components/SimpleAppBar";
import Heatmap from "./components/Heatmap";
import theme from "./utils/theme";
import Filter from "./components/Filter";
import { HeatmapData } from "./types/HeatmapData";
import { initialHeatmap } from "./utils/initialHeatmap";
import Api from "./utils/Api";
import { CustomPosition } from "./types/CustomPosition";

const App = () => {
  const [heatmapVisible, setHeatmapVisible] = useState(true);
  const [radius, setRadius] = useState(50);
  const [opacity, setOpacity] = useState(0.8);
  const [positions, setPositions] = useState<Array<CustomPosition>>([
    { lat: 51.2366927, lng: 6.7754234 },
    { lat: 51.223, lng: 6.783 },
    { lat: 51.23, lng: 6.77 },
    { lat: 51.24, lng: 6.78 },
    { lat: 51.25, lng: 6.79 },
    { lat: 51.26, lng: 6.8 }
  ]);
  const [heatmap, setHeatmap] = useState(null);

  const [heatmapData, setHeatmapData] = useState<HeatmapData>({
    ...initialHeatmap
  });

  const fetchHeatmap = async () => {
    try {
      // const response = await Api.fetchHeatmap();
      // TODO: positions setzen
      // setPositions(response.data);
      updateHeatmapData();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchHeatmap();
  }, []);

  useEffect(() => {
    updateHeatmapData();
  }, [heatmapVisible, radius, opacity]);

  const updateHeatmapData = () => {
    let updatedHeatmapData: HeatmapData;

    if (!heatmapVisible) {
      updatedHeatmapData = { ...heatmapData, positions: [] };
    } else {
      updatedHeatmapData = {
        ...heatmapData,
        positions: [...positions],
        options: { radius, opacity }
      };
    }
    setHeatmapData(updatedHeatmapData);
  };

  const handleSetRadius = (radius: number) => {
    if (heatmap !== null) {
      // @ts-ignore
      heatmap.set("radius", radius);
    }
    setRadius(radius);
  };

  const handleSetOpacity = (opacity: number) => {
    if (heatmap !== null) {
      // @ts-ignore
      heatmap.set("opacity", opacity);
    }
    setOpacity(opacity);
  };

  const handleSetHeatmap = (heatmap: any) => {
    setHeatmap(heatmap);
  };

  useEffect(() => {
    handleSetOpacity(opacity);
    handleSetRadius(radius);
  }, [heatmap]);

  return (
    <MuiThemeProvider theme={theme}>
      <SimpleAppBar />
      <Filter
        heatmapVisible={heatmapVisible}
        setHeatmapVisible={setHeatmapVisible}
        radius={radius}
        setRadius={handleSetRadius}
        opacity={opacity}
        setOpacity={handleSetOpacity}
      />
      <Heatmap
        heatmapData={heatmapData}
        setRadius={handleSetRadius}
        setOpacity={handleSetOpacity}
        setHeatmap={handleSetHeatmap}
      />
    </MuiThemeProvider>
  );
};

export default App;
