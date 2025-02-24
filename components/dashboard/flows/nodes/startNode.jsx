import React from "react";
import BaseNodeData from "../ui/basenodesdata";
import { PlayCircle } from "lucide-react";

const StartNode = ({ data, isConnectable }) => {
  return (
    <BaseNodeData
      data={data}
      isConnectable={isConnectable}
      color="border-green-700"
      icon = {PlayCircle}
    >
      {/* <p className="text-white text-sm">{data.text}</p> */}
    </BaseNodeData>
  );
};

export default StartNode;
