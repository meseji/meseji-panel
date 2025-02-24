import React from "react";
import BaseNodeData from "../ui/basenodesdata";
import { PlayCircle } from "lucide-react";
export default function UserInputNode({ data, isConnectable,removeNode }) {
  return (
    <BaseNodeData
      data={data}
      isConnectable={isConnectable}
      color="bg-green-500 border-green-700"
      icon={PlayCircle}
      removeNode={removeNode}
    >
      <p className="text-white text-sm">{data.text || "Enter user input..."}</p>
    </BaseNodeData>
  );
}
