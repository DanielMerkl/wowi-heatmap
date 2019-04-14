import React, { useEffect, useState } from "react";

import { LinearProgress, MuiThemeProvider } from "@material-ui/core";

import SimpleAppBar from "./components/SimpleAppBar";
import Heatmap from "./components/Heatmap";
import theme from "./utils/theme";
import Filter from "./components/Filter";
import Api from "./utils/Api";
import { Schaden } from "./types/Schaden";
import { Bestand } from "./types/Bestand";
import { mapToCoordinates } from "./utils/mapToCoordinates";
import { makeStyles } from "@material-ui/styles";
import AdressSearch from "./components/AdressSearch";
import { Coordinate } from "./types/Coordinate";

const App = () => {
  const classes = useStyles();

  const [map, setMap] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [globalMarker, setGlobalMarker] = useState(null);
  const [radius, setRadius] = useState(50);
  const [opacity, setOpacity] = useState(0.8);

  const [loadingData, setLoadingData] = useState(true);
  const [gebaeude, setGebaeude] = useState<Array<Bestand>>([]);
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
  }, [
    darstellungsart,
    gebaeude,
    schaeden,
    filterFirmenname,
    filterSchadensart
  ]);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const gebaeudeResponse = await Api.fetchGebaeude();
      setGebaeude(gebaeudeResponse.data);

      const schaedenResponse = await Api.fetchSchaeden();
      setSchaeden(schaedenResponse.data);
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
    let coordinates: Array<Coordinate>;

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
          el => el.SchadenCode === filterSchadensart
        );
      }
    }

    coordinates = mapToCoordinates(filteredData);

    if (heatmap !== null && coordinates !== null) {
      // @ts-ignore
      heatmap.setData(new window.google.maps.MVCArray(coordinates));
    }
  };

  const setCenter = (coordinate: Coordinate) => {
    if (map !== null) {
      // @ts-ignore
      map.setCenter(coordinate);

      // @ts-ignore
      const marker = new window.google.maps.Marker({
        position: coordinate,
        map: map
      });
      setGlobalMarker(marker);
    }
  };

  const removeMarker = () => {
    if (globalMarker !== null) {
      // @ts-ignore
      globalMarker.setMap(null);
      setGlobalMarker(null);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <SimpleAppBar />
      <div style={{ height: 1 }}>{loadingData && <LinearProgress />}</div>
      <AdressSearch
        marker={globalMarker}
        setCenter={setCenter}
        removeMarker={removeMarker}
      />
      <div className={classes.gridWrapper}>
        <Heatmap setMap={setMap} setHeatmap={setHeatmap} />
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
      </div>
    </MuiThemeProvider>
  );
};

const useStyles = makeStyles({
  gridWrapper: {
    display: "grid",
    gridGap: "16px",
    gridTemplateColumns: "1fr 200px",
    maxWidth: window.innerWidth * 0.9,
    margin: "auto"
  }
});

export default App;
