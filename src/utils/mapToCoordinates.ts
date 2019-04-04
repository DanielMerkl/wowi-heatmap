import { Gebaeude } from "../types/Gebaeude";
import { Schaden } from "../types/Schaden";

export const mapToCoordinates = (data: Array<Gebaeude | Schaden>) => {
  return data.map(el => {
    // @ts-ignore
    return new window.google.maps.LatLng(el.lat, el.lng);
  });
};
