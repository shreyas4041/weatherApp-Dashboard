import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherData,
  clearWeatherData,
  clearWeatherError,
} from "../redux/actions/weatherActions";
import LoadingSpinner from "../components/LoadingSpinner";
import WeatherGraph from "../components/WeatherGraph";
import WeatherDataTable from "../components/WeatherDataTable";
import {
  isValidLatitude,
  isValidLongitude,
  isValidDateRange,
  isValidDate,
  isWithinApiLimits,
} from "../utils/validation";

function WeatherDashboard() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [touched, setTouched] = useState({
    latitude: false,
    longitude: false,
    startDate: false,
    endDate: false,
  });
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const errors = {};
    let isValid = true;

    if (touched.latitude) {
      if (latitude === "") {
        errors.latitude = "Latitude is required";
        isValid = false;
      } else if (!isValidLatitude(latitude)) {
        errors.latitude = "Invalid latitude (-90 to 90)";
        isValid = false;
      } else {
        errors.latitude = "";
      }
    } else {
      errors.latitude = "";
    }

    if (touched.longitude) {
      if (longitude === "") {
        errors.longitude = "Longitude is required";
        isValid = false;
      } else if (!isValidLongitude(longitude)) {
        errors.longitude = "Invalid longitude (-180 to 180)";
        isValid = false;
      } else {
        errors.longitude = "";
      }
    } else {
      errors.longitude = "";
    }

    if (touched.startDate) {
      if (startDate === "") {
        errors.startDate = "Start Date is required";
        isValid = false;
      } else if (!isValidDate(startDate)) {
        errors.startDate = "Invalid Start Date format";
        isValid = false;
      } else {
        errors.startDate = "";
      }
    } else {
      errors.startDate = "";
    }

    if (touched.endDate) {
      if (endDate === "") {
        errors.endDate = "End Date is required";
        isValid = false;
      } else if (!isValidDate(endDate)) {
        errors.endDate = "Invalid End Date format";
        isValid = false;
      } else {
        errors.endDate = "";
      }
    } else {
      errors.endDate = "";
    }

    if (touched.startDate && touched.endDate && startDate && endDate) {
      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        errors.dateRange = "Both dates must be valid";
        isValid = false;
      } else if (!isValidDateRange(startDate, endDate)) {
        errors.dateRange = "End Date must be after or same as Start Date";
        isValid = false;
      } else if (!isWithinApiLimits(startDate, endDate)) {
        errors.dateRange =
          "Date range must be within API historical limits (approx. 1940 to today)";
        isValid = false;
      } else {
        errors.dateRange = "";
      }
    } else if (
      (touched.startDate || touched.endDate) &&
      (!startDate || !endDate)
    ) {
      errors.dateRange =
        "Both Start and End Dates are required for range check";
      isValid = false;
    } else {
      errors.dateRange = "";
    }

    const areRequiredFieldsFilled =
      latitude !== "" && longitude !== "" && startDate !== "" && endDate !== "";

    setFormValid(
      areRequiredFieldsFilled &&
        Object.values(errors).every((err) => err === "")
    );
    setInputErrors(errors);

    if (
      (latitude !== "" && !isValidLatitude(latitude)) ||
      (longitude !== "" && !isValidLongitude(longitude)) ||
      (startDate !== "" && !isValidDate(startDate)) ||
      (endDate !== "" && !isValidDate(endDate)) ||
      (startDate &&
        endDate &&
        isValidDate(startDate) &&
        isValidDate(endDate) &&
        !isValidDateRange(startDate, endDate))
    ) {
      dispatch(clearWeatherData());
    }
  }, [latitude, longitude, startDate, endDate, touched, dispatch]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleFetchWeather = (e) => {
    e.preventDefault();
    setTouched({
      latitude: true,
      longitude: true,
      startDate: true,
      endDate: true,
    });

    if (!formValid) {
      console.log("Form is invalid, not fetching.");
      if (Object.values(inputErrors).some((err) => err !== "")) {
        alert("Please fix the errors in the form before fetching data.");
      }
      return;
    }

    dispatch(
      fetchWeatherData(
        parseFloat(latitude),
        parseFloat(longitude),
        startDate,
        endDate
      )
    );
  };

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-8">
          {/* Input Form Section */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Enter Location and Date Range
            </h2>
            <form
              onSubmit={handleFetchWeather}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-4"
            >
              <div>
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Latitude
                </label>
                <input
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  onBlur={() => handleBlur("latitude")}
                  placeholder="e.g., 52.52"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    inputErrors.latitude
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                  step="any"
                  required
                />
                {inputErrors.latitude && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400 animate-fade-in">
                    {inputErrors.latitude}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Longitude
                </label>
                <input
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  onBlur={() => handleBlur("longitude")}
                  placeholder="e.g., 13.41"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    inputErrors.longitude
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200`}
                  step="any"
                  required
                />
                {inputErrors.longitude && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400 animate-fade-in">
                    {inputErrors.longitude}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  max={today}
                  onChange={(e) => setStartDate(e.target.value)}
                  onBlur={() => handleBlur("startDate")}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    inputErrors.startDate || inputErrors.dateRange
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 appearance-none`}
                  required
                />
                {inputErrors.startDate && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400 animate-fade-in">
                    {inputErrors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  max={today}
                  onChange={(e) => setEndDate(e.target.value)}
                  onBlur={() => handleBlur("endDate")}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    inputErrors.endDate || inputErrors.dateRange
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 appearance-none`}
                  required
                />
                {inputErrors.endDate && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400 animate-fade-in">
                    {inputErrors.endDate}
                  </p>
                )}
              </div>
              {inputErrors.dateRange && (
                <div className="md:col-span-2 lg:col-span-4">
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {inputErrors.dateRange}
                  </p>
                </div>
              )}

              <div className="md:col-span-2 lg:col-span-4 flex justify-center">
                <button
                  type="submit"
                  disabled={!formValid || loading}
                  className={`w-full md:w-auto px-8 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    formValid && !loading
                      ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Fetching..." : "Fetch Weather Data"}
                </button>
              </div>
            </form>
          </section>

          {loading && <LoadingSpinner />}

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-300 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <button
                  onClick={() => dispatch(clearWeatherError())}
                  className="text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100"
                >
                  <svg
                    className="fill-current h-6 w-6"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15L6.147 6.852a1.2 1.2 0 1 1 1.697-1.697l2.757 3.152 2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </button>
              </span>
            </div>
          )}

          {/* Data Display Section */}
          {!loading && !error && data && data.length > 0 && (
            <section className="flex flex-col gap-8 mt-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Weather Chart
                </h3>
                <WeatherGraph data={data} />
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl overflow-x-auto">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Weather Data Table
                </h3>
                <WeatherDataTable data={data} />
              </div>
            </section>
          )}

          {/* No Data Message */}
          {!loading && !error && (!data || data.length === 0) && formValid && (
            <div
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-300 px-4 py-3 rounded relative text-center"
              role="alert"
            >
              No weather data available for the selected criteria.
            </div>
          )}

          {/* Initial State Message */}
          {!loading && !error && !data && !formValid && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300 px-4 py-3 rounded relative text-center">
              Enter Latitude, Longitude, Start Date, and End Date to fetch
              weather data.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherDashboard;
