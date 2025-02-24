import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { CancelIcon } from "@/components/Icon";

const toastTypes = {
  default:
    "max-w-xs dark:bg-white dark:border dark:border-gray-200 rounded-xl shadow-lg bg-neutral-800 border-neutral-700 text-gray-50 dark:text-gray-800",
  success:
    "max-w-xs  dark:bg-white dark:border dark:border-gray-200 rounded-xl shadow-lg bg-neutral-800 border-neutral-700 text-green-50 dark:text-green-800",
  error:
    "max-w-xs dark:bg-white dark:border dark:border-gray-200 rounded-xl shadow-lg bg-neutral-800 border-neutral-700 text-red-800 dark:text-red-500",
  info: "max-w-xs dark:bg-white dark:border dark:border-gray-200 rounded-xl shadow-lg bg-neutral-800 border-neutral-700 text-blue-800 dark:text-blue-500",
  warning:
    "max-w-xs dark:bg-white dark:border dark:border-gray-200 rounded-xl shadow-lg bg-neutral-800 border-neutral-700 text-yellow-800 dark:text-yellow-500",
};

export default function Toast ({ type = "default", message, onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        "max-w-xs p-4 rounded-xl shadow-lg flex items-center space-x-4",
        toastTypes[type]
      )}
    >
      <div className="flex-1">
        <p>{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        className="text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white"
      >
        {/* <FiX className="w-5 h-5" /> */}
        <CancelIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(["success", "error", "info", "warning"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};


