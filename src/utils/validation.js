export const isValidLatitude = (lat) => {
  const num = parseFloat(lat);
  return !isNaN(num) && num >= -90 && num <= 90;
};

export const isValidLongitude = (lon) => {
  const num = parseFloat(lon);
  return !isNaN(num) && num >= -180 && num <= 180;
};

export const isValidDate = (dateString) => {
  // Checks if the string is in YYYY-MM-DD format and represents a valid date
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false;
  }
  const date = new Date(dateString);
  // Check if date is valid and the string components match the date object components (to prevent "2023-02-30")
  return (
    date instanceof Date &&
    !isNaN(date) &&
    date.toISOString().slice(0, 10) === dateString
  );
};

export const isValidDateRange = (startDate, endDate) => {
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return false; // Ensure both dates are valid first
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
};

// You can add more specific checks if needed, like maximum date range supported by API
// Open-Meteo Archive goes back to 1940
export const isWithinApiLimits = (startDate, endDate) => {
  const minDate = new Date("1940-01-01");
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  // Simple check: Dates are after minDate and not in the future
  // API might have more nuanced limits, check documentation if needed
  return start >= minDate && end >= minDate && start <= today && end <= today;
};
