import { Bestand } from "../../types/Bestand";
import { Schaden } from "../../types/Schaden";

export const FETCH_BESTAENDE_REQUEST = "[data] FETCH_BESTAENDE_REQUEST";
export const FETCH_BESTAENDE_FAILURE = "[data] FETCH_BESTAENDE_FAILURE";
export const FETCH_BESTAENDE_SUCCESS = "[data] FETCH_BESTAENDE_SUCCESS";

export const FETCH_SCHAEDEN_REQUEST = "[data] FETCH_SCHAEDEN_REQUEST";
export const FETCH_SCHAEDEN_FAILURE = "[data] FETCH_SCHAEDEN_FAILURE";
export const FETCH_SCHAEDEN_SUCCESS = "[data] FETCH_SCHAEDEN_SUCCESS";

export interface FetchBestaendeRequestAction {
  type: typeof FETCH_BESTAENDE_REQUEST;
}

export interface FetchBestaendeSuccessAction {
  type: typeof FETCH_BESTAENDE_SUCCESS;
  bestaende: Array<Bestand>;
}

export interface FetchBestaendeFailureAction {
  type: typeof FETCH_BESTAENDE_FAILURE;
  error: string;
}

export interface FetchSchaedenRequestAction {
  type: typeof FETCH_SCHAEDEN_REQUEST;
}

export interface FetchSchaedenSuccessAction {
  type: typeof FETCH_SCHAEDEN_SUCCESS;
  schaeden: Array<Schaden>;
}

export interface FetchSchaedenFailureAction {
  type: typeof FETCH_SCHAEDEN_FAILURE;
  error: string;
}

export type DataActions =
  | FetchBestaendeRequestAction
  | FetchBestaendeSuccessAction
  | FetchBestaendeFailureAction
  | FetchSchaedenRequestAction
  | FetchSchaedenSuccessAction
  | FetchSchaedenFailureAction;

export interface DataState {
  bestaende: Array<Bestand>;
  schaeden: Array<Schaden>;
  loadingBestaende: boolean;
  loadingSchaeden: boolean;
  error: string;
}
