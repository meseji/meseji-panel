"use client";
import React from "react";
import PropTypes from "prop-types"; // Optional for prop type validation
import { cn } from "@/lib/utils/utils";

export default function Title({
  children,
  size = "text-xl",
  color = "text-gray-800",
  className = "",
}) {
  return (
    <h1
      className={cn(
        "font-semibold text-[22px]",
        { size },
        { color },
        { className }
      )}
    >
      {children}
    </h1>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};
