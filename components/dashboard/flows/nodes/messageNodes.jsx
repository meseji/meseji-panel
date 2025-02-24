"use client"
import React from "react";
import BaseNodeData from "../ui/basenodesdata";
import { PlayCircle } from "lucide-react";

export  default function MessageNode  ({id, data, isConnectable,removeNode }) {
  console.log(id)
  return (
    <BaseNodeData
      data={data}
      id={id}
      isConnectable={isConnectable}
      color="border-green-700"
      icon = {PlayCircle}
      removeNode={removeNode}
    >
      <p className="text-white text-sm">{data.text}</p>
    </BaseNodeData>
  );
};

