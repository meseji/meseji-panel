import React from "react";

const ToggleSwitch = ({ checked, onChange, rounded = true }) => {
  return (
    <label className="switch relative inline-block w-14 h-8">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`slider absolute top-0 left-0 right-0 bottom-0 cursor-pointer transition-all duration-400 ${
          rounded ? "rounded-full" : ""
        }`}
        style={{
          backgroundColor: checked ? "#525252" : "#656565", // Slider background: blue when checked, gray otherwise
        }}
      ></span>
      <span
        className={`absolute h-6 w-6 bottom-[4px] left-[4px] transition-all duration-400 ${
          rounded ? "rounded-full" : ""
        }`}
        style={{
          backgroundColor: checked ? "#0b0a0a" : "#ffffff", // Circle color: dark blue when checked, white otherwise
          transform: checked ? "translateX(26px)" : "translateX(0)",
        }}
      ></span>
    </label>
  );
};

export default ToggleSwitch;
