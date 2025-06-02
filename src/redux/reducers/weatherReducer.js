import {
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  CLEAR_WEATHER_DATA,
  CLEAR_WEATHER_ERROR,
} from "../types";

const initialState = {
  data: null,
  loading: false, error: null,
};

export default function weatherReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_WEATHER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        data: null,
        loading: false,
        error: payload,
      };
    case CLEAR_WEATHER_DATA:
      return {
        ...state,
        data: null,
        error: null,
      };
    case CLEAR_WEATHER_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
