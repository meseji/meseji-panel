"use client";
import { Icon } from "@/components/Icon";
import Title from "@/components/ui/Title";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import MainHeader from "@/components/dashboard/shared/MainHeader";
import CreateBroadcast from "@/components/dashboard/broadcast/create-broadcast";

export default function Page() {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      setSelected(null);
    } else {
      setSelected(i);
    }
  };
  return (
    <div className="flex flex-col h-full w-full space-y-1">

      <MainHeader title="Create Broadcast"></MainHeader>

      {/* <div className="w-full relative mx-auto border rounded-3xl mt-12 border-gray-500">
        <ul className="list-none" role="list">
          <li className="relative border-b border-gray-500">
            <div className="w-full px-8 py-6 text-left">
              <div className="flex items-center justify-between text-gray-800 group">
                <div className="flex justify-center items-center gap-1">
                  <p className="text-lg font-bold">Holi Broadcast Message</p>
                  <Icon.pencil className="size-4 mb-1 " />
                </div>
              </div>
            </div>
          </li>
          <li className="relative border-b border-gray-500">
            <button
              type="button"
              className="w-full px-8 py-6 text-left"
              onClick={() => toggle(1)}
            >
              <div className="flex items-center justify-between text-gray-800 group">
                <div>
                  <h3 className="text-2xl font-semibold mb-1">Audience</h3>
                  <p className="text-gray-500">
                    Choose the sender of the broadcast
                  </p>
                </div>
                <svg
                  className={`inline w-5 h-5 ml-4 transition-transform duration-200 transform ${
                    selected === 1 ? "rotate-180" : "rotate-0"
                  } group-hover:text-indigo-400`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
            <div
              className={`relative overflow-hidden transition-all duration-700 ${
                selected === 1 ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="px-8 pt-4 pb-20 text-sm text-gray-800">
          
              </div>
            </div>
          </li>
          <li className="relative border-b border-gray-500">
            <button
              type="button"
              className="w-full px-8 py-6 text-left"
              onClick={() => toggle(2)}
            >
              <div className="flex items-center justify-between text-gray-800 group">
                <div>
                  <h3 className="text-2xl font-semibold mb-1">Message</h3>
                  <p className="text-gray-500">
                    Select Template or write your own message
                  </p>
                </div>
                <svg
                  className={`inline w-5 h-5 ml-4 transition-transform duration-200 transform ${
                    selected === 2 ? "rotate-180" : "rotate-0"
                  } group-hover:text-indigo-400`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
            <div
              className={`relative overflow-hidden transition-all duration-700 ${
                selected === 2 ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="px-8 pt-4 pb-20 text-sm text-gray-800">
              <div>
                  <h3 className="text-base font-semibold">Template Category</h3>
                  <span className="text-sm text-gray-500">
                    Choose template for your broadcast
                  </span>
                  <select
                    name="template"
                    // value={templateData.category}
                    // onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  >
                    <option value="hello_template">hello_template</option>
                    <option value="user_auth">user_auth</option>
                    <option value="user_onboard">user_onboard</option>
                  </select>
                </div>
              </div>
            </div>
          </li>

          <li className="relative">
            <button
              type="button"
              className="w-full px-8 py-6 text-left"
              onClick={() => toggle(3)}
            >
              <div className="flex items-center justify-between text-gray-800 group">
                <div>
                  <h3 className="text-2xl font-semibold mb-1">From</h3>
                  <p className="text-gray-500">
                    Choose the sender of the broadcast
                  </p>
                </div>
                <svg
                  className={`inline w-5 h-5 ml-4 transition-transform duration-200 transform ${
                    selected === 3 ? "rotate-180" : "rotate-0"
                  } group-hover:text-indigo-400`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
            <div
              className={`relative overflow-hidden transition-all duration-700 ${
                selected === 3 ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="px-8 pt-4 pb-20 text-sm text-vulcan-300">
                Some Input Box
              </div>
            </div>
          </li>
        </ul>
      </div> */}
      {/* <div className="flex flex-col items-center min-h-screen mt-4">
        <div className="max-w-7xl">
          <p className="text-center text-gray-600">
            How would you like to start?
          </p>

          <div className="flex justify-around mt-6">
            <div className="flex flex-col items-center p-4 transition-transform transform hover:scale-105">
              <div className="w-16 h-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <span className="text-3xl">+</span>
              </div>
              <p className="mt-2 text-sm font-medium">Blank Broadcast</p>
              <p className="text-sm text-gray-500">Start from scratch</p>
            </div>

            <div className="flex flex-col items-center p-4 transition-transform transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 flex items-center justify-center rounded-lg">
                <svg
                  className="w-8 h-8 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M..." />
                </svg>
              </div>
              <p className="mt-2 text-sm font-medium">Use a template</p>
              <p className="text-sm text-gray-500">Choose from library</p>
            </div>

            <div className="flex flex-col items-center p-4 transition-transform transform hover:scale-105">
              <div className="w-16 h-16 bg-green-100 flex items-center justify-center rounded-lg">
                <svg
                  className="w-8 h-8 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M..." />
                </svg>
              </div>
              <p className="mt-2 text-sm font-medium">Import spreadsheet</p>
              <p className="text-sm text-gray-500">Add from another tool</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold">Recommended for you</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M..." />
                  </svg>
                </div>
                <p className="ml-4 font-medium">Google Sheet</p>
              </li>

              <li className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M..." />
                  </svg>
                </div>
                <p className="ml-4 font-medium">Custom Data</p>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      <CreateBroadcast />
    </div>
  );
}
