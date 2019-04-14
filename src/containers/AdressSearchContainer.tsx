import React, { ChangeEvent, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppActions, AppState } from "../store/stors";
import { Coordinate } from "../types/Coordinate";
import { removeMarkerAction, setCenterAction } from "../store/map/mapActions";
import AdressSearch from "../components/AdressSearch";
import { GEOCODE_BASE_URL, MAPS_API_KEY } from "../utils/mapsApi";

export interface AdressSearchContainerProps {
  marker: any;
  removeMarker: () => void;
  setCenter: (coordinate: Coordinate) => void;
}

const AdressSearchContainer = (props: AdressSearchContainerProps) => {
  const [adresse, setAdresse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdresseChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" && props.marker !== null) {
      props.removeMarker();
    }
    setAdresse(e.target.value);
  };

  const handleSearch = async () => {
    if (adresse === "") {
      return;
    }

    try {
      setLoading(true);

      const parameter = adresse.replace(" ", "+");
      const url = `${GEOCODE_BASE_URL}${parameter}&key=${MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length <= 0) {
        throw new Error("Es konnten keine Koordinaten gefunden werden!");
      }

      const coordinate: Coordinate = { ...data.results[0].geometry.location };
      props.setCenter(coordinate);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    props.removeMarker();
    setAdresse("");
  };

  return (
    <AdressSearch
      {...props}
      loading={loading}
      handleAdresseChange={handleAdresseChange}
      handleReset={handleReset}
      adresse={adresse}
      handleSearch={handleSearch}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  marker: state.map.marker
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  setCenter: (coordinate: Coordinate) => dispatch(setCenterAction(coordinate)),
  removeMarker: () => dispatch(removeMarkerAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdressSearchContainer);
