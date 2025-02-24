import { Icon } from "@/components/Icon";
import Link from "next/link";
import React, { useState, useMemo } from "react";

export default function CustomTable({ data, columns, initialPageSize = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData?.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(data?.length / pageSize);

  const handleRowsPerPageChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handleNavigation = (action) => {
    if (action === "first") setCurrentPage(1);
    else if (action === "previous" && currentPage > 1)
      setCurrentPage((prev) => prev - 1);
    else if (action === "next" && currentPage < totalPages)
      setCurrentPage((prev) => prev + 1);
    else if (action === "last") setCurrentPage(totalPages);
  };

  return (
    <div>
      <table className="w-full text-left bg-zinc-100 text-gray-500">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-center">
              {" "}
              {/* Add text-center */}
              <div className="flex items-center justify-center">
                {" "}
                {/* Center the checkbox */}
                <input
                  id="checkbox-all"
                  type="checkbox"
                  className="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                />
              </div>
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-6 py-3 text-center cursor-pointer" // Add text-center here
                onClick={() => handleSort(col.key)}
              >
                {col.title}
                {sortConfig.key === col.key &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {paginatedData?.map((row, index) => (
            <tr key={index} className="bg-white border-b hover:bg-lime-50">
              <td className="w-4 p-4 text-center">
                {" "}
                {/* Add text-center */}
                <input
                  type="checkbox"
                  value={row._id}
                  className="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 rounded focus:ring-lime-500 cursor-pointer"
                />
              </td>
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-2 text-center">
                  {" "}
                  {/* Add text-center */}
                  {row[col.key]}
                </td>
              ))}
              <td className="flex items-center justify-center px-4 py-2">
                {" "}
                {/* Center action buttons */}
                <Link
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
        <div>
          {selectedRows?.length} of {data?.length} row(s) selected.
        </div>
        <div className="flex items-center gap-4">
          <div className="max-w-sm space-y-3">
            <select
              value={pageSize}
              onChange={handleRowsPerPageChange}
              className="py-2 px-3 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {[10, 20, 40, 60, 80, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handleNavigation("first")}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              «
            </button>
            <button
              disabled={currentPage === 1}
              onClick={() => handleNavigation("previous")}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              <Icon.left className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handleNavigation("next")}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              <Icon.right className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handleNavigation("last")}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
