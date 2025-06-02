import React, { useState, useEffect, useMemo } from "react";

function WeatherDataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const paginatedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage === 0 && totalPages > 0) {
      setCurrentPage(1);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [data, itemsPerPage, totalPages]);

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    const sampleEntry = data[0];
    const keys = Object.keys(sampleEntry).filter((key) => key !== "date");
    return ["date", ...keys];
  }, [data]);

  const pageNumbers = useMemo(() => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const numbers = [];
    for (let i = startPage; i <= endPage; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [currentPage, totalPages]);

  const itemsPerPageOptions = [5, 10, 20, 50];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
        Weather Data Table
      </h3>

      {!data || data.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          No data available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {columns.map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {key
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}{" "}
                    {key !== "date" && "(°C)"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((day, index) => (
                <tr
                  key={day.date || index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {columns.map((key) => (
                    <td
                      key={`${day.date}-${key}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                    >
                      {day[key] !== null && day[key] !== undefined
                        ? key === "date"
                          ? day[key]
                          : day[key].toFixed(1)
                        : "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex items-center space-x-4">
          <label
            htmlFor="itemsPerPage"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-200"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {`Showing ${Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              data?.length || 0
            )} to ${Math.min(
              currentPage * itemsPerPage,
              data?.length || 0
            )} of ${data?.length || 0} entries`}
          </span>
        </div>

        <nav className="flex items-center space-x-1" aria-label="Pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1 || !data || data.length === 0}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
              currentPage === 1 || !data || data.length === 0
                ? "border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              aria-current={currentPage === number ? "page" : undefined}
              className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                currentPage === number
                  ? "bg-blue-600 border-blue-600 text-white dark:bg-blue-700 dark:border-blue-700"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
              currentPage === totalPages || totalPages === 0
                ? "border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}

export default WeatherDataTable;
