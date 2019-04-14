import { Coordinate } from "../../types/Coordinate";

export const INIT_MAPS = "[map] INIT_MAPS";
export const SET_CENTER = "[map] SET_CENTER";
export const SET_RADIUS = "[map] SET_RADIUS";
export const SET_OPACITY = "[map] SET_OPACITY";
export const SET_POINTS = "[map] SET_POINTS";

export interface InitMapsAction {
  type: typeof INIT_MAPS;
}

export interface SetCenterAction {
  type: typeof SET_CENTER;
  coordinate: Coordinate;
}

export interface SetRadiusAction {
  type: typeof SET_RADIUS;
  radius: number;
}

export interface SetOpacityAction {
  type: typeof SET_OPACITY;
  opacity: number;
}

export interface SetPointsAction {
  type: typeof SET_POINTS;
  points: Array<Coordinate>;
}

export type MapActions =
  | InitMapsAction
  | SetCenterAction
  | SetRadiusAction
  | SetOpacityAction
  | SetPointsAction;

export interface MapState {
  map: any;
  heatmap: any;
  marker: any;
  radius: number;
  opacity: number;
}
