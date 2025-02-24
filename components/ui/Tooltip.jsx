import React, { useState, useRef, useEffect } from "react";

export default function TooltipButton({
  tooltipContent,
  position = "top",
  children,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;

      let newPosition = position;

      if (rect.left < 0) newPosition = "right";
      else if (rect.right > innerWidth) newPosition = "left";
      else if (rect.top < 0) newPosition = "bottom";
      else if (rect.bottom > innerHeight) newPosition = "top";

      setAdjustedPosition(newPosition);
    }
  }, [isVisible, position]);

  const positionClasses = {
    top: "bottom-full mb-3 left-1/2 -translate-x-1/2",
    right: "left-full ml-3 top-1/2 -translate-y-1/2",
    bottom: "top-full mt-3 left-1/2 -translate-x-1/2",
    left: "right-full mr-3 top-1/2 -translate-y-1/2",
  };

  const arrowPositionClasses = {
    top: "-bottom-1.5 left-1/2 -translate-x-1/2 rotate-45 border-b border-r",
    right: "-left-1.5 top-1/2 -translate-y-1/2 rotate-45 border-b border-l",
    bottom: "-top-1.5 left-1/2 -translate-x-1/2 rotate-45 border-t border-l",
    left: "-right-1.5 top-1/2 -translate-y-1/2 rotate-45 border-t border-r",
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      
        {children}
     

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-10 whitespace-nowrap rounded-md bg-white py-2 px-4 text-xs text-gray-800 font-medium transition-opacity duration-300 border border-gray-300 shadow-lg ${positionClasses[adjustedPosition]}`}
        >
          {tooltipContent}
          <span
            className={`absolute h-3 w-3 bg-white border-gray-300 ${arrowPositionClasses[adjustedPosition]}`}
          ></span>
        </div>
      )}
    </div>
  );
}
