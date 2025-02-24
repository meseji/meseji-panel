"use client";

import React from "react";

const FlowNavUi = ({ icon: Icon, label }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-2 border border-gray-200 rounded-lg bg-white shadow-md cursor-grab hover:shadow-lg transition">
      {/* Icon */}
      <div className="px-2 py-1 ">
        <Icon size={24} className="text-lime-700" />
      </div>

      {/* Label */}
      <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
    </div>
  );
};

export default FlowNavUi;
