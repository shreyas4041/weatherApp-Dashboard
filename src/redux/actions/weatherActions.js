import {
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  CLEAR_WEATHER_DATA,
  CLEAR_WEATHER_ERROR,
} from "../types";
import { fetchHistoricalWeather } from "../../api/openMeteo";

export const fetchWeatherData =
  (lat, lon, startDate, endDate) => async (dispatch) => {
    dispatch({ type: CLEAR_WEATHER_ERROR });
    dispatch({ type: FETCH_WEATHER_START });

    try {
      const formattedData = await fetchHistoricalWeather(
        lat,
        lon,
        startDate,
        endDate
      );

      dispatch({
        type: FETCH_WEATHER_SUCCESS,
        payload: formattedData,
      });
    } catch (error) {
      console.error("Action failed to fetch weather data:", error);

      dispatch({
        type: FETCH_WEATHER_FAILURE,
        payload: error.message,
      });
    }
  };

export const clearWeatherData = () => (dispatch) => {
  dispatch({ type: CLEAR_WEATHER_DATA });
};

export const clearWeatherError = () => (dispatch) => {
  dispatch({ type: CLEAR_WEATHER_ERROR });
};
