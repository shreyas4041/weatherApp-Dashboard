export const isValidLatitude = (lat) => {
  const num = parseFloat(lat);
  return !isNaN(num) && num >= -90 && num <= 90;
};

export const isValidLongitude = (lon) => {
  const num = parseFloat(lon);
  return !isNaN(num) && num >= -180 && num <= 180;
};

export const isValidDate = (dateString) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false;
  }
  const date = new Date(dateString);
  return (
    date instanceof Date &&
    !isNaN(date) &&
    date.toISOString().slice(0, 10) === dateString
  );
};

export const isValidDateRange = (startDate, endDate) => {
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return false;
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
};

export const isWithinApiLimits = (startDate, endDate) => {
  const minDate = new Date("1940-01-01");
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  return start >= minDate && end >= minDate && start <= today && end <= today;
};
