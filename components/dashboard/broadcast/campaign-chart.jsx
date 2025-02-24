"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CampaignChart({ data }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">📊 Performance Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sent" fill="#4CAF50" name="Sent ✅" />
          <Bar dataKey="delivered" fill="#2196F3" name="Delivered 📩" />
          <Bar dataKey="read" fill="#FF9800" name="Read 👀" />
          <Bar dataKey="clicked" fill="#673AB7" name="Clicked 🔗" />
          <Bar dataKey="failed" fill="#F44336" name="Failed ❌" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}