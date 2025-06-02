import React from "react";

function DatePicker({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  min,
  max,
  className = "",
}) {
  const baseInputClasses =
    "mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm";
  const errorInputClasses = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
    : "";

  const datePickerStyles = {
    colorScheme: "dark",
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="date"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`${baseInputClasses} ${errorInputClasses} ${className}`}
        style={datePickerStyles}
        required={required}
        min={min}
        max={max}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export default DatePicker;
