# Historical Weather Dashboard

A React + Vite web application to fetch and visualize historical weather data using the [Open-Meteo API](https://open-meteo.com/).

## Features

- Search historical weather by latitude, longitude, and date range (from 1940 to today)
- Data visualization with interactive charts (Chart.js)
- Paginated weather data table
- Form validation and error handling
- Responsive, dark mode-friendly UI (Tailwind CSS)
- Redux for state management

## Getting Started

### Prerequisites

- **Node.js** version 20.10.10 (recommended)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd weather_app_vite
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the App

Start the development server:
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Usage

1. Enter latitude and longitude for your location.
2. Select a start and end date (from 1940 to today).
3. Click "Fetch Weather Data".
4. View the weather trends chart and data table.

## Project Structure

```
├── public/                # Static assets
├── src/
│   ├── api/               # API calls (Open-Meteo)
│   ├── assets/            # Images, logos
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── redux/             # Redux store, actions, reducers, types
│   ├── utils/             # Utility functions (validation, etc.)
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind and global styles
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## API

- Uses [Open-Meteo Archive API](https://open-meteo.com/en/docs/historical-weather-api)
- No API key required


**Made with React, Redux, Vite, and Tailwind CSS.**