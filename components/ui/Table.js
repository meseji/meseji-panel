import React from "react";
import PropTypes from "prop-types";

export default function Table({ columns, data }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left bg-zinc-100 text-gray-500 border-2 border-gray-200">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns?.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-base">
          {data?.map((user, index) => (
            <tr key={index} className="bg-white border-b hover:bg-lime-50">
              {columns?.map((column) => (
                <td key={column} className="px-6 py-4">
                  {user[column] || "N/A"} {/* Show 'N/A' if data is missing */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
