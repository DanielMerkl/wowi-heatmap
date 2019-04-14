import {
  DataActions,
  DataState,
  FETCH_BESTAENDE_FAILURE,
  FETCH_BESTAENDE_REQUEST,
  FETCH_BESTAENDE_SUCCESS,
  FETCH_SCHAEDEN_FAILURE,
  FETCH_SCHAEDEN_REQUEST,
  FETCH_SCHAEDEN_SUCCESS
} from "./dataTypes";

export const initialDataState: DataState = {
  bestaende: [],
  schaeden: [],
  loadingBestaende: false,
  loadingSchaeden: false,
  error: ""
};

export const dataReducer = (
  state: DataState = initialDataState,
  action: DataActions
): DataState => {
  switch (action.type) {
    case FETCH_BESTAENDE_REQUEST:
      return { ...state, loadingBestaende: true };
    case FETCH_BESTAENDE_SUCCESS:
      return { ...state, bestaende: action.bestaende, loadingBestaende: false };
    case FETCH_BESTAENDE_FAILURE:
      return { ...state, error: action.error, loadingBestaende: false };
    case FETCH_SCHAEDEN_REQUEST:
      return { ...state, loadingSchaeden: true };
    case FETCH_SCHAEDEN_SUCCESS:
      return { ...state, schaeden: action.schaeden, loadingSchaeden: false };
    case FETCH_SCHAEDEN_FAILURE:
      return { ...state, error: action.error, loadingSchaeden: false };
    default:
      return state;
  }
};
