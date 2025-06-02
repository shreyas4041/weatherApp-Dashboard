import React from "react";
import moment from "moment";

function WeatherForm({
  inputs,
  handleInputChange,
  handleSubmit,
  formError,
  loading,
}) {
  const today = moment().format("YYYY-MM-DD");
  const thirtyDaysAgo = moment().subtract(30, "days").format("YYYY-MM-DD");

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div>
        <label
          htmlFor="latitude"
          className="block text-sm font-medium text-gray-700"
        >
          Latitude (-90 to 90):
        </label>
        <input
          type="number"
          id="latitude"
          name="latitude"
          value={inputs.latitude}
          onChange={handleInputChange}
          min="-90"
          max="90"
          step="0.0001"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="longitude"
          className="block text-sm font-medium text-gray-700"
        >
          Longitude (-180 to 180):
        </label>
        <input
          type="number"
          id="longitude"
          name="longitude"
          value={inputs.longitude}
          onChange={handleInputChange}
          min="-180"
          max="180"
          step="0.0001"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={inputs.startDate || thirtyDaysAgo}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={inputs.endDate || today}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {formError && (
        <div className="md:col-span-2 text-red-600 text-sm">{formError}</div>
      )}

      <div className="md:col-span-2 flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
            loading
              ? "bg-blue-400"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }`}
        >
          {loading ? "Fetching..." : "Get Weather Data"}
        </button>
      </div>
    </form>
  );
}

export default WeatherForm;
