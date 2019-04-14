import { Bestand } from "../types/Bestand";
import { Schaden } from "../types/Schaden";

export const mapToCoordinates = (data: Array<Bestand | Schaden>) => {
  return data.map(el => {
    // @ts-ignore
    return new window.google.maps.LatLng(el.lat, el.lng);
  });
};
