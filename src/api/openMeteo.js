import axios from "axios";

const API_URL = "https://archive-api.open-meteo.com/v1/archive";
const WEATHER_VARIABLES = [
  "temperature_2m_max",
  "temperature_2m_min",
  "temperature_2m_mean",
  "apparent_temperature_max",
  "apparent_temperature_min",
  "apparent_temperature_mean",
];

export const fetchHistoricalWeather = async (
  latitude,
  longitude,
  startDate,
  endDate
) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        latitude: latitude,
        longitude: longitude,
        start_date: startDate,
        end_date: endDate,
        daily: WEATHER_VARIABLES.join(","),
        timezone: "auto",
      },
    });

    if (!response.data || !response.data.daily || !response.data.daily.time) {
      throw new Error(
        "Invalid response format from API or no daily data received."
      );
    }

    const dailyData = response.data.daily;
    const formattedData = dailyData.time.map((date, index) => {
      const entry = {
        date: date,
      };
      WEATHER_VARIABLES.forEach((variable) => {
        const key = variable.replace("_2m", "").replace("_", " ");
        entry[key] = dailyData[variable] ? dailyData[variable][index] : null;
      });
      return entry;
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching weather data from Open-Meteo:", error);
    let userErrorMessage =
      "Failed to fetch weather data. Please check your inputs and try again.";
    if (error.response) {
      console.error("API Response Error:", error.response.data);
      userErrorMessage = `API Error: ${error.response.data.reason || error.message}`;
    } else if (error.request) {
      console.error("API No Response Error:", error.request);
      userErrorMessage = "Network error: Could not connect to the weather API.";
    } else {
      console.error("API Request Setup Error:", error.message);
      userErrorMessage = `Request error: ${error.message}`;
    }

    throw new Error(userErrorMessage);
  }
};
