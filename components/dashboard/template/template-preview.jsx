import { ImageIcon, VideoIcon } from "lucide-react";
import { Phone, SquareArrowOutUpRight } from "lucide-react";
import React from "react";

const TemplatePreview = ({
  templateHeader,
  templateData,
  buttons,
  quickReplies,
}) => {
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Template Preview</h3>
      <p className="text-sm text-gray-500 mb-4">
        Your template message preview. It will update as you fill in the values
        in the form.
      </p>

      {/* Preview Container */}
      <div className=" p-3 rounded-md shadow-md max-w-md mt-6 mx-auto relative bg-white">
        {/* WhatsApp Logo */}
        <div className="absolute -top-7 -left-5 bg-white rounded-full p-0.5 shadow-md">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Logo"
            className="w-10 h-10"
          />
        </div>

        {/* Header Section */}
        {templateHeader?.format === "TEXT" && (
          <div className="bg-gray-100 p-3 rounded-md mb-3">
            <p className="text-sm font-medium text-gray-700">
              {templateHeader.text || "Header Text Preview"}
            </p>
          </div>
        )}
        {templateHeader?.format === "IMAGE" && (
          <div className="bg-orange-100 p-3 rounded-md mb-1 flex justify-center items-center h-32">
            <span className="text-sm text-blue-600 font-medium">
              <ImageIcon></ImageIcon>
            </span>
          </div>
        )}
        {templateHeader?.format === "VIDEO" && (
          <div className="bg-gray-100 p-3 rounded-md mb-1 flex justify-center items-center h-32">
            <span className="text-sm text-purple-600 font-medium">
              <VideoIcon />
            </span>
          </div>
        )}
        {templateHeader?.format === "DOCUMENT" && (
          <div className="bg-pink-100 p-3 rounded-md mb-1 flex justify-center items-center h-32">
            <span className="text-sm text-pink-600 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8m-6-6l6 6m-6-6v6h6"
                />
              </svg>
            </span>
          </div>
        )}

        {/* Message Bubble */}
        {(templateData?.content || templateData?.text) && (
          <div className="p-3 rounded-lg mb-3 relative">
            <p
              className="text-sm text-gray-800"
              style={{ whiteSpace: "pre-line" }} // Ensures line breaks are preserved
            >
              {(templateData?.content || templateData?.text).replace(
                /{{(\d+)}}/g,
                (_, index) => {
                  const exampleValue =
                    templateData?.exampleValues?.[index - 1] ||
                    templateData?.example?.body_text?.[0]?.[index - 1] ||
                    `{{${index}}}`; // Fallback to the placeholder itself
                  return exampleValue;
                }
              )}
            </p>
          </div>
        )}

        {/* Footer Section */}
        {templateData?.footer && (
          <div className="mt-1 px-3 py-1 text-xs text-gray-500">
            {templateData.footer}
          </div>
        )}

        {/* Buttons Section */}
        {buttons && buttons.length > 0 && (
          <div className="mt-1 space-y-2 ">
            {buttons.map((button, index) => (
              <div
                key={index}
                className="flex items-center  justify-center bg-gray-100 rounded-md "
              >
                {" "}
                {button.type === "PHONE_NUMBER" && (
                  <Phone size={16} className="text-green-600" />
                )}
                {button.type === "URL" && (
                  <SquareArrowOutUpRight size={16} className="text-blue-600" />
                )}
                <button
                  className=" text-gray-800 py-2 px-2 rounded-md text-sm flex items-center justify-center space-x-1" // Center both icon and text
                  onClick={() => {
                    alert(`Button clicked: ${button.text}`);
                  }}
                >
                  {button.text}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Quick Replies Section */}
        {quickReplies && quickReplies.length > 0 && (
          <div className="mt-1 space-y-1">
            {quickReplies.map((reply, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 justify-center bg-gray-100 rounded-md"
              >
                <button
                  className="text-blue-600 py-2 px-4 rounded-md text-sm"
                  onClick={() => {
                    alert(`Quick reply clicked: ${reply.text}`);
                  }}
                >
                  {reply.text}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="mt-4 text-xs text-gray-400 text-center">
        Disclaimer: This is just a graphical representation of the message that
        will be delivered. Actual messages may vary based on media selected.
      </p>
    </div>
  );
};

export default TemplatePreview;
