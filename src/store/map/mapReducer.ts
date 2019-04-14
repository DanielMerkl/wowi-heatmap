import {
  INIT_MAPS,
  MapActions,
  MapState,
  SET_CENTER,
  SET_OPACITY,
  SET_POINTS,
  SET_RADIUS
} from "./mapTypes";
import { ergoStandort } from "../../utils/ergoStandort";

export const initialMapState: MapState = {
  map: null,
  heatmap: null,
  marker: null,
  radius: 50,
  opacity: 0.8
};

export const mapReducer = (
  state: MapState = initialMapState,
  action: MapActions
): MapState => {
  switch (action.type) {
    case INIT_MAPS:
      // @ts-ignore
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: ergoStandort,
        zoom: 13
      });

      // @ts-ignore
      const heatmap = new window.google.maps.visualization.HeatmapLayer({});
      heatmap.setMap(map);

      return { ...state, map, heatmap };

    case SET_CENTER:
      state.map.setCenter(action.coordinate);

      // @ts-ignore
      const marker = new window.google.maps.Marker({
        position: action.coordinate,
        map: state.map
      });

      return { ...state, marker };

    case SET_RADIUS:
      state.heatmap.set("radius", action.radius);

      return { ...state, radius: action.radius };

    case SET_OPACITY:
      state.heatmap.set("radius", action.opacity);

      return { ...state, opacity: action.opacity };

    case SET_POINTS:
      // @ts-ignore
      state.heatmap.setData(new window.google.maps.MVCArray(action.points));

      return state;

    default:
      return state;
  }
};
