import React from "react";

import { Handle, Position } from "@xyflow/react";
import { Pencil ,DeleteIcon} from "lucide-react";

const BaseNodeData = ({
  data,
  id,
  isConnectable,
  children,
  removeNode,
  icon: Icon,
}) => {
  console.log(data)
  return (
    <div
      className={`flex flex-col min-w-52 p-1 z-60  border-2 border-lime-600 rounded-lg bg-white shadow-md relative `}
    >
      {/* Node Header */}
      <div className="flex flex-row justify-between items-center ">
        <div className="flex flex-row items-center">
          <div className="px-2 py-1 ">
            <Icon size={14} className="text-lime-700" />
          </div>

          <span className="text-sm  text-gray-800">{data.label}</span>
        </div>

        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => removeNode(id)}
        >
          <DeleteIcon size={16} />
        </button>
      </div>

      {/* Dynamic Content */}
      <div className="w-full min-h-52 text-gray-700">{children}</div>

      {/* Handles for Connections */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        // className="w-16 h-16 bg-white border-2 border-white rounded-full absolute -left-2 top-1/2 transform -translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        // className="w-4 h-4 bg-white border-2 border-white rounded-full absolute -right-2 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
};

export default BaseNodeData;
