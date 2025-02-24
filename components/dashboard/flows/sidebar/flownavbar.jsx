"use client";

import { Icon } from "@/components/Icon";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FlowNavUi from "../ui/flownavui";
import { PlayCircle } from "lucide-react";
import { setType } from "@/lib/features/slice/dndSlice";

// Define categories and their respective nodes
const nodeCategories = {
  General: [
    { type: "start", label: "Start", description: "Begin the flow", icon: PlayCircle },
    { type: "message", label: "Message", icon: Icon.chat },
    { type: "userInput", label: "User Input", icon: Icon.UserInputIcon },
  ],
  LLMs: [{ type: "question", label: "Question", icon: Icon.QuestionIcon }],
  Logic: [
    { type: "attributes", label: "Attributes", icon: Icon.TagIcon },
    { type: "listMessage", label: "List Message", icon: Icon.ListIcon },
  ],
  Payment: [
    { type: "multiProduct", label: "Multi-Product", icon: Icon.ProductIcon },
    { type: "singleProduct", label: "Single Product", icon: Icon.ProductIcon },
  ],
};

export default function FlowsSidebar() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("General");

  const handleDragStart = (event, nodeType) => {
    console.log(nodeType);
    dispatch(setType(nodeType));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-full border border-gray-200 bg-white rounded-lg shadow-md">
      {/* Category Tabs & Actions */}
      <div className="flex items-center justify-between border-b p-3">
        {/* Category Tabs */}
        <div className="flex space-x-6">
          {Object.keys(nodeCategories).map((category) => (
            <span
              key={category}
              className={`cursor-pointer text-sm font-medium pb-2 transition-all duration-200 ${
                activeCategory === category
                  ? "text-lime-600 border-b-2 border-lime-600 font-semibold"
                  : "text-gray-600 hover:text-lime-600"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Preview
          </button>
          <button className="px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-md hover:bg-yellow-200">
            Draft
          </button>
          <button className="px-3 py-1 text-sm font-medium text-white bg-lime-600 rounded-md hover:bg-purple-700">
            Publish
          </button>
        </div>
      </div>

      {/* Nodes List - Horizontal Scrollable */}
      <div className="flex overflow-x-auto p-3 space-x-4 bg-gray-50 rounded-b-lg">
        {nodeCategories[activeCategory].map((node) => (
          <div
            key={node.type}
            draggable
            onDragStart={(e) => handleDragStart(e, node.type)}
            className="flex-shrink-0"
          >
            <FlowNavUi {...node} />
          </div>
        ))}
      </div>
    </div>
  );
}
