import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { DataActions, DataState } from "./data/dataTypes";
import { dataReducer } from "./data/dataReducer";

import { MapActions, MapState } from "./map/mapTypes";
import { mapReducer } from "./map/mapReducer";

export interface AppState {
  data: DataState;
  map: MapState;
}

export type AppActions = DataActions | MapActions;

const reducers = combineReducers<AppState>({
  data: dataReducer,
  map: mapReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
