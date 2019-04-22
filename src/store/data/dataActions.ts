import {
  DataActions,
  FETCH_BESTAENDE_FAILURE,
  FETCH_BESTAENDE_REQUEST,
  FETCH_BESTAENDE_SUCCESS,
  FETCH_SCHAEDEN_FAILURE,
  FETCH_SCHAEDEN_REQUEST,
  FETCH_SCHAEDEN_SUCCESS,
  FetchBestaendeFailureAction,
  FetchBestaendeRequestAction,
  FetchBestaendeSuccessAction,
  FetchSchaedenFailureAction,
  FetchSchaedenRequestAction,
  FetchSchaedenSuccessAction
} from "./dataTypes";
import { Bestand } from "../../types/Bestand";
import { Schaden } from "../../types/Schaden";
import { ThunkAction } from "redux-thunk";
import { AppActions, AppState } from "../stors";
import { Dispatch } from "redux";
import Api from "../../utils/Api";

export const fetchBestaendeAction = (): ThunkAction<
  void,
  AppState,
  null,
  AppActions
> => async (dispatch: Dispatch<DataActions>) => {
  dispatch(fetchBestaendeRequestAction());
  try {
    // const response: any = await Api.fetchBestaende();
    // const bestaende: Array<Bestand> = response.data;
    const testBestaende = [
      { lat: 51.2366927, lng: 6.7754234, firma: "Fullhouse GmbH" },
      { lat: 51.24, lng: 6.78, firma: "Fullhouse GmbH" },
      { lat: 51.25, lng: 6.77, firma: "Fullhouse GmbH" },
      { lat: 51.23, lng: 6.72, firma: "Daystar GmbH" },
      { lat: 51.23, lng: 6.71, firma: "Daystar GmbH" },
      { lat: 51.22, lng: 6.7, firma: "Daystar GmbH" }
    ];
    dispatch(fetchBestaendeSuccessAction(testBestaende));
  } catch (e) {
    console.error(e);
    dispatch(fetchBestaendeFailureAction(e));
  }
};

const fetchBestaendeRequestAction = (): FetchBestaendeRequestAction => ({
  type: FETCH_BESTAENDE_REQUEST
});

const fetchBestaendeSuccessAction = (
  bestaende: Array<Bestand>
): FetchBestaendeSuccessAction => ({
  type: FETCH_BESTAENDE_SUCCESS,
  bestaende
});

const fetchBestaendeFailureAction = (
  error: string
): FetchBestaendeFailureAction => ({
  type: FETCH_BESTAENDE_FAILURE,
  error
});

export const fetchSchaendenAction = (): ThunkAction<
  void,
  AppState,
  null,
  AppActions
> => async (dispatch: Dispatch<DataActions>) => {
  dispatch(fetchSchaedenRequestAction());
  try {
    const response: any = await Api.fetchSchaeden();
    const schaeden: Array<Schaden> = response.data;
    dispatch(fetchSchaedenSuccessAction(schaeden));
  } catch (e) {
    console.error(e);
    dispatch(fetchSchaedenFailureAction(e));
  }
};

const fetchSchaedenRequestAction = (): FetchSchaedenRequestAction => ({
  type: FETCH_SCHAEDEN_REQUEST
});

const fetchSchaedenSuccessAction = (
  schaeden: Array<Schaden>
): FetchSchaedenSuccessAction => ({
  type: FETCH_SCHAEDEN_SUCCESS,
  schaeden
});

const fetchSchaedenFailureAction = (
  error: string
): FetchSchaedenFailureAction => ({
  type: FETCH_SCHAEDEN_FAILURE,
  error
});
