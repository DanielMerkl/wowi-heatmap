import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { GpsFixed } from "@material-ui/icons";

export interface AdressSearchProps {
  setCenter: (coordinate: { lat: number; lng: number }) => void;
}

const AdressSearch = (props: AdressSearchProps) => {
  const [adresse, setAdresse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    // TODO: implementieren
  };

  return (
    <div style={{ paddingLeft: window.innerWidth * 0.05, marginTop: 16 }}>
      <TextField
        style={{ width: 300 }}
        label="Adresse"
        value={adresse}
        onChange={e => setAdresse(e.target.value)}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={handleSearch}
        style={{ marginTop: 12, marginLeft: 16 }}
      >
        <GpsFixed style={{ marginRight: 16 }} />
        Prüfen
      </Button>
    </div>
  );
};

export default AdressSearch;
