import React from "react";

const OverviewCard = ({ title, value, change, positive }) => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl">
      <div className="p-4 md:p-5 flex justify-between gap-x-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            {title}
          </p>
          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
              {value}
            </h3>
            <span className="flex items-center gap-x-1 text-green-600">
              <svg
                className="inline-block size-5 self-center"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              <div
                className={`text-sm ${
                  positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {positive ? "↑" : "↓"} {Math.abs(change)}%
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export function OverviewCards() {
  const data = [
    {
      title: "Messages Sent",
      value: "32,432",
      change: 12.95,
      positive: true,
    },
    {
      title: "Messages Delivered",
      value: "30,000",
      change: -0.33,
      positive: false,
    },
    {
      title: "Messages Read",
      value: "28,543",
      change: 0.32,
      positive: true,
    },
    {
      title: "Toal Cost",
      value: "4,211,832",
      change: 8.05,
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {data?.map((item, index) => (
        <OverviewCard
          key={index}
          title={item.title}
          value={item.value}
          change={item.change}
          positive={item.positive}
        />
      ))}
    </div>
  );
}
