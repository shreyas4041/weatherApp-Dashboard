import {
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  CLEAR_WEATHER_DATA,
  CLEAR_WEATHER_ERROR,
} from "../types";

const initialState = {
  data: null, // Will store the fetched and formatted array of daily weather objects
  loading: false, // Indicates if data is being fetched
  error: null, // Stores any error message string
};

export default function weatherReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_WEATHER_START:
      return {
        ...state,
        loading: true,
        error: null, // Clear previous error on new fetch
        // Optionally clear previous data: data: null,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        data: payload, // Payload is the formatted array of daily data
        loading: false,
        error: null, // Ensure no error on success
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        data: null, // Clear data on failure
        loading: false,
        error: payload, // Store the error message
      };
    case CLEAR_WEATHER_DATA:
      return {
        ...state,
        data: null,
        error: null, // Also clear error when clearing data
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
