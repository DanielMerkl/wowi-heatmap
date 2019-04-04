import React, { useEffect, useState } from "react";

import { LinearProgress, MuiThemeProvider } from "@material-ui/core";

import SimpleAppBar from "./components/SimpleAppBar";
import Heatmap from "./components/Heatmap";
import theme from "./utils/theme";
import Filter from "./components/Filter";
import Api from "./utils/Api";
import { Schaden } from "./types/Schaden";
import { Gebaeude } from "./types/Gebaeude";
import { mapToCoordinates } from "./utils/mapToCoordinates";

const App = () => {
  const [heatmap, setHeatmap] = useState(null);
  const [radius, setRadius] = useState(50);
  const [opacity, setOpacity] = useState(0.8);

  const [loadingData, setLoadingData] = useState(true);
  const [gebaeude, setGebaeude] = useState<Array<Gebaeude>>([]);
  const [schaeden, setSchaeden] = useState<Array<Schaden>>([]);

  const [darstellungsart, setDarstellungsart] = useState("Gebäude");
  const [filterFirmenname, setFilterFirmenname] = useState("");
  const [filterSchadensart, setFilterSchadensart] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSetRadius(radius);
    handleSetOpacity(opacity);
  }, [heatmap]);

  useEffect(() => {
    updateHeatmap();
  }, [darstellungsart, gebaeude, schaeden]);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      // const gebaeudeResponse = await Api.fetchGebaeude();
      // setGebaeude(gebaeudeResponse.data);
      //
      // const schaedenResponse = await Api.fetchSchaeden();
      // setSchaeden(schaedenResponse.data);

      setGebaeude([{ lat: 51.2366927, lng: 6.7754234, firma: "Hallo" }]);
      setSchaeden([{ lat: 51.236, lng: 6.775, schadensart: "Hallo" }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
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

  const updateHeatmap = () => {
    let filteredData;
    let coordinates;

    if (darstellungsart === "Gebäude") {
      if (filterFirmenname === "") {
        filteredData = gebaeude;
      } else {
        filteredData = gebaeude.filter(el => el.firma === filterFirmenname);
      }
    } else {
      if (filterSchadensart === "") {
        filteredData = schaeden;
      } else {
        filteredData = schaeden.filter(
          el => el.schadensart === filterSchadensart
        );
      }
    }

    coordinates = mapToCoordinates(filteredData);

    if (heatmap !== null && coordinates !== null) {
      // @ts-ignore
      heatmap.setData(new window.google.maps.MVCArray(coordinates));
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <SimpleAppBar />
      <div style={{ height: 1 }}>{loadingData && <LinearProgress />}</div>
      <Filter
        darstellungsart={darstellungsart}
        setDarstellungsart={setDarstellungsart}
        filterFirmenname={filterFirmenname}
        setFilterFirmenname={setFilterFirmenname}
        filterSchadensart={filterSchadensart}
        setFilterSchadensart={setFilterSchadensart}
        radius={radius}
        setRadius={handleSetRadius}
        opacity={opacity}
        setOpacity={handleSetOpacity}
      />
      <Heatmap setHeatmap={setHeatmap} />
    </MuiThemeProvider>
  );
};

export default App;
