import { CustomPosition } from "./CustomPosition";

export interface HeatmapData {
  positions: Array<CustomPosition>;
  options: {
    radius: number;
    opacity: number;
  };
}
