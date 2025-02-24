"use client";
import { useState, useEffect, useRef } from "react";

export default function FilterButton({
  menuItems = [], // List of { label: string, value: string }
  placeholder = "View",
  onChange = () => {}, // Callback when selection changes
  selected = [], // Pre-selected values
  multiSelect = true, // Allow multiple selections
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(selected);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (optionValue) => {
    let updatedSelection;

    if (multiSelect) {
      // Toggle selection
      if (selectedOptions.includes(optionValue)) {
        updatedSelection = selectedOptions.filter((val) => val !== optionValue);
      } else {
        updatedSelection = [...selectedOptions, optionValue];
      }
    } else {
      updatedSelection = [optionValue]; // Single selection
      setIsOpen(false); // Close dropdown for single-select
    }

    setSelectedOptions(updatedSelection);
    onChange(updatedSelection);
  };

  const isOptionSelected = (optionValue) => selectedOptions.includes(optionValue);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine the button content and width based on the number of selected options
  const buttonText = selectedOptions.length > 0 
    ? `${selectedOptions.length} Selected` 
    : placeholder;

  const buttonWidth = selectedOptions.length > 0 ? 'w-auto' : 'w-20'; // Width adjustment based on selection

  return (
    <div className="relative inline-block w-full max-w-xs" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={toggleDropdown}
        className={`py-2 px-3 flex justify-between items-center text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none ${buttonWidth}`}
      >
        {buttonText}
        <svg
          className="w-4 h-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full max-h-48 overflow-auto rounded-lg border border-gray-200 bg-white shadow-md">
          {menuItems.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`cursor-pointer flex justify-between items-center px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 ${
                isOptionSelected(option.value) ? "bg-gray-100" : ""
              }`}
            >
              <div className="">{isOptionSelected(option.value) && (
                <svg
                  className="w-4 h-4 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}</div>
              <span className="items-start">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
