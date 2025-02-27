"use client";
import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils/utils";

export default function Title({ children, className = "", tag }) {
  return (
    <div>
      {tag && (
        <span className="py-1 px-4 rounded-full text-lg font-clash font-semibold text-lime-500 text-center">
          {tag}
        </span>
      )}
      <h2
        className={cn(
          "text-5xl mb-2 tracking-tight bg-gradient-to-bl from-stone-900 to-gray-600 bg-clip-text text-transparent py-5 font-clash font-medium ",
          className
        )}
      >
        {children}
      </h2>
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string.isRequired,
  className: PropTypes.string,
};
