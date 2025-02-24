import React from "react";
import BaseNodeData from "../ui/basenodesdata";

export default function MultiProductNode({ data,isConnectable,removeNode }) {
  console.log(isConnectable, data);
  console.log(removeNode)
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
