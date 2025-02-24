import { useState, useEffect } from "react";

export default function RightSideModal({ isOpen, closeModal, children }) {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  return (
    <>
      {/* Overlay (Backdrop) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
      ></div>

      {/* Right-Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Edit Node</h2>
          <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
            ✖
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}
