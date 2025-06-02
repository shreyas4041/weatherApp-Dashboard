import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const borderColors = {
  "temperature max": "rgba(255, 99, 132, 1)", // Red
  "temperature min": "rgba(54, 162, 235, 1)", // Blue
  "temperature mean": "rgba(75, 192, 192, 1)", // Teal
  "apparent temperature max": "rgba(255, 159, 64, 1)", // Orange
  "apparent temperature min": "rgba(153, 102, 255, 1)", // Purple
  "apparent temperature mean": "rgba(201, 203, 207, 1)", // Gray
};

const backgroundColors = {
  "temperature max": "rgba(255, 99, 132, 0.2)",
  "temperature min": "rgba(54, 162, 235, 0.2)",
  "temperature mean": "rgba(75, 192, 192, 0.2)",
  "apparent temperature max": "rgba(255, 159, 64, 0.2)",
  "apparent temperature min": "rgba(153, 102, 255, 0.2)",
  "apparent temperature mean": "rgba(201, 203, 207, 0.2)",
};

function WeatherGraph({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  const labels = data.map((day) => day.date);

  const datasetKeys = [
    "temperature max",
    "temperature min",
    "temperature mean",
    "apparent temperature max",
    "apparent temperature min",
    "apparent temperature mean",
  ];

  const datasets = datasetKeys
    .map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1) + " (°C)",
      data: data.map((day) => day[key]),
      borderColor: borderColors[key] || "rgba(0,0,0,1)",
      backgroundColor: backgroundColors[key] || "rgba(0,0,0,0.2)",
      tension: 0.1,
      fill: false,
      pointRadius: 2,
      pointHoverRadius: 5,
    }))
    .filter((dataset) =>
      dataset.data.some((value) => value !== null && value !== undefined)
    );

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Temperatures Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Temperature Trends
      </h3>
      <div style={{ height: "400px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default WeatherGraph;
