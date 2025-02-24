"use client";
import React from "react";
import CustomTable from "../shared/Table";

export default function RecipientsOverview({ recepients, activeTab }) {
  const columns = [
    { key: "name", title: "Name" },
    { key: "contact", title: "Contact" },
  ];

  if (activeTab === "sent") {
    columns.push({ key: "sentAt", title: "Sent At" });
  } else if (activeTab === "delivered") {
    columns.push(
      { key: "sentAt", title: "Sent At" },
      { key: "deliveredAt", title: "Delivered At" }
    );
  } else if (activeTab === "read") {
    columns.push(
      { key: "sentAt", title: "Sent At" },
      { key: "deliveredAt", title: "Delivered At" },
      { key: "seenAt", title: "Seen At" }
    );
  }

  function formatDateWithTime(date) {
    return new Date(date).toLocaleString('en-US', {
      month: 'short', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true, 
    });
  }
  
  const filteredRecipients = recepients?.filter((r) => r.status === activeTab);
  const customizeData = filteredRecipients?.map((r) => ({
    name: r.name || "N/A",
    contact: r.contact || "N/A",
    sentAt: formatDateWithTime(r.sentAt) || "N/A",
    deliveredAt: formatDateWithTime(r.deliveredAt) || "N/A",
    seenAt: formatDateWithTime(r.seenAt) || "N/A",
  }))

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        👥 Recipients Overview
      </h2>
      <CustomTable data={customizeData} columns={columns} />
    </div>
  );
}
