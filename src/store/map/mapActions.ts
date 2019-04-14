import {
  INIT_MAPS,
  InitMapsAction,
  REMOVE_MARKER,
  RemoveMarkerAction,
  SET_CENTER,
  SET_OPACITY,
  SET_POINTS,
  SET_RADIUS,
  SetCenterAction,
  SetOpacityAction,
  SetPointsAction,
  SetRadiusAction
} from "./mapTypes";
import { Coordinate } from "../../types/Coordinate";

export const initMapsAction = (): InitMapsAction => ({
  type: INIT_MAPS
});

export const setCenterAction = (coordinate: Coordinate): SetCenterAction => ({
  type: SET_CENTER,
  coordinate
});

export const setRadiusAction = (radius: number): SetRadiusAction => ({
  type: SET_RADIUS,
  radius
});

export const setOpacityAction = (opacity: number): SetOpacityAction => ({
  type: SET_OPACITY,
  opacity
});

export const setPointsAction = (
  points: Array<Coordinate>
): SetPointsAction => ({
  type: SET_POINTS,
  points
});

export const removeMarkerAction = (): RemoveMarkerAction => ({
  type: REMOVE_MARKER
});
