export interface HeatmapData {
  positions: {
    lat: number;
    lng: number;
  }[];
  options: {
    radius: number;
    opacity: number;
  };
}
