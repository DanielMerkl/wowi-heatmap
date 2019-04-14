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
    const response: any = await Api.fetchBestaende();
    const bestaende: Array<Bestand> = response.data;
    dispatch(fetchBestaendeSuccessAction(bestaende));
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
