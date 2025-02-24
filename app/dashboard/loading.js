"use client";
export default function Loading() {
    const rows = Array.from({ length: 5 });
  return (
    <div className="w-full table-auto my-10 bg-white shadow-md rounded-2xl p-4">
      <table className="w-full">
        <thead>
          <tr className="text-sm font-normal text-gray-600 border-b text-left">
            <th className="px-4 py-3">Client ID</th>
            <th className="px-4 py-3">Start Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Connect</th>
          </tr>
        </thead>
        <tbody className="text-sm font-medium text-gray-700">
          {rows.map((_, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50 transition animate-pulse"
            >
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-8 bg-gray-300 rounded w-2/3"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
