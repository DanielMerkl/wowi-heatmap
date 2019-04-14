import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppActions, AppState } from "../store/stors";
import { Dispatch } from "redux";
import {
  setOpacityAction,
  setPointsAction,
  setRadiusAction
} from "../store/map/mapActions";
import { Coordinate } from "../types/Coordinate";
import Filter from "../components/Filter";
import { Bestand } from "../types/Bestand";
import { Schaden } from "../types/Schaden";
import { mapToCoordinates } from "../utils/mapToCoordinates";

interface FilterContainerProps {
  radius: number;
  setRadius: (radius: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  bestaende: Array<Bestand>;
  schaeden: Array<Schaden>;
  setPoints: (points: Array<Coordinate>) => void;
  map: any;
}

const FilterContainer = (props: FilterContainerProps) => {
  const [darstellungsart, setDarstellungsart] = useState("Bestand");
  const [filterFirmenname, setFilterFirmenname] = useState("");
  const [filterSchadensart, setFilterSchadensart] = useState("");

  useEffect(() => {
    if (props.map === null) {
      return;
    }

    let filteredData;
    let coordinates: Array<Coordinate>;

    if (darstellungsart === "Bestand") {
      if (filterFirmenname === "") {
        filteredData = props.bestaende;
      } else {
        filteredData = props.bestaende.filter(
          el => el.firma === filterFirmenname
        );
      }
    } else {
      if (filterSchadensart === "") {
        filteredData = props.schaeden;
      } else {
        filteredData = props.schaeden.filter(
          el => el.SchadenCode === filterSchadensart
        );
      }
    }

    coordinates = mapToCoordinates(filteredData);
    props.setPoints(coordinates);
  }, [filterFirmenname, filterSchadensart, darstellungsart]);

  return (
    <Filter
      {...props}
      darstellungsart={darstellungsart}
      setDarstellungsart={setDarstellungsart}
      filterFirmenname={filterFirmenname}
      setFilterFirmenname={setFilterFirmenname}
      filterSchadensart={filterSchadensart}
      setFilterSchadensart={setFilterSchadensart}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  radius: state.map.radius,
  opacity: state.map.opacity,
  bestaende: state.data.bestaende,
  schaeden: state.data.schaeden,
  map: state.map.map
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  setRadius: (radius: number) => dispatch(setRadiusAction(radius)),
  setOpacity: (opacity: number) => dispatch(setOpacityAction(opacity)),
  setPoints: (points: Array<Coordinate>) => dispatch(setPointsAction(points))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterContainer);
