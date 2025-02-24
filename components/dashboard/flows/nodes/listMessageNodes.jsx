import React from "react";
import BaseNodeData from "../ui/basenodesdata";

export default function ListMessageNode({ data,isConnectable }) {
  return (
    <BaseNodeData
    data={data}
    isConnectable={isConnectable}
    color="bg-green-500 border-green-700"
  >
    <p className="text-white text-sm">{data.text || "Enter user input..."}</p>
  </BaseNodeData>
  );
}
