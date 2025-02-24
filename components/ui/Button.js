"use client";
import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon";

export default function Button({
  icon,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick = () => {},
  disabled = false,
}) {
  const baseStyles = "focus:outline-none focus:ring-2 gap-[6px] rounded-xl";
  const sizeStyles = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary:
      "flex items-center bg-lime-600/80 shadow-sm shadow-transparent text-white font-semibold transition-all duration-500 hover:shadow-lime-400 hover:bg-lime-600",
    secondary:
      "flex items-center bg-black text-white hover:bg-gray-800 shadow-sm shadow-transparent font-semibold transition-all duration-500 hover:shadow-lime-400",
    outline:
      "bg-white text-gray-900 border border-gray-300 font-semibold shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
    disabled:
      "bg-gray-100 font-semibold border-gray-300 text-gray-500 cursor-auto",
  };

  const IconComponent = icon && Icon[icon] ? Icon[icon] : null;

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${
        disabled ? variantStyles.disabled : variantStyles[variant]
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {IconComponent && <IconComponent className="w-[18px] h-[18px]" />}
      {children}
    </button>
  );
}

// Optional: Prop type validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "outline", "disabled"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
