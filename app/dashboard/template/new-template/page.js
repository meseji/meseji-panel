"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import { useCreateTemplateMutation } from "@/lib/features/api/whatsappApiSlice";
import { useRouter } from "next/navigation";
import MainHeader from "@/components/dashboard/shared/MainHeader";
import { Spinner } from "@/components/ui/Spinner";
import TemplatePreview from "@/components/dashboard/template/template-preview";
import { CancelIcon } from "@/components/Icon";
import { Plus } from "lucide-react";
import PhoneNumberInput from "@/components/dashboard/shared/phone-number";
import Toast from "@/components/shared/toast/Toast";

export default function NewTemplateMessagePage() {
  // local states
  const [actionType, setActionType] = useState("none");
  const [buttons, setButtons] = useState([
    { type: "", text: "", url: "", phone_number: "" },
  ]);
  const [quickReplies, setQuickReplies] = useState([
    { type: "QUICK_REPLY", text: "" },
  ]);
  const [templateData, setTemplateData] = useState({
    name: "",
    language: "",
    category: "",
    content: "",
    footer: "",
    exampleValues: [],
  });
  const [templateHeader, setTemplateHeader] = useState({
    type: "HEADER",
    format: "",
    text: "",
    example: null,
  });
  const [toast, setToast] = useState({
    type: "",
    message: "",
    isVisible: false,
  });

  // calling apis
  const [createTemplate, { isLoading }] = useCreateTemplateMutation();

  // react hooks and functions
  const router = useRouter();

  // general function start from here
  function generateDynamicHandles(format) {
    const handleData = {
      IMAGE: [
        "4:aW1hZ2UucG5n:aW1hZ2UvcG5n:ARbuGnbf-bvwPBD7IhVCMfW4l8tfzZ0_d3laaLktoDu9S4Jtt7Ue0bE2SdTsJM5T0dE7ZLBV_3BvkJEM62mCdKt4cVOPYtI7hXC6nRnuiQ4vbQ:e:1736702193:1441629160072404:61565975294827:ARbW7N_32nG__VyT2Sw",
      ],
      VIDEO: [
        "4:dmlkZW8ucG5n:aW1hZ2UvcG5n:ARbI_0fWdTlbdl1LoK2FYFWDrVwjQFwVcLdn4zHsCXopde7HzLluLiJaR-42oDEGKGZLm-322-VaSeaorYfCwWYGUnvwqfMK5nvLB1CobdME_Q:e:1736704573:1441629160072404:61565975294827:ARZUh9zIvayAsRjbIpU",
      ],
      DOCUMENT: [
        "4:ZG9jdW1lbnQgaW1nLnBuZw==:aW1hZ2UvcG5n:ARb9yjS8juOPsKYbRH3abFCam53ABXIXht4lpTQY46A2LTVwXMdZQ-hTiMyyZ1NWSJUTB6TEC9PSXHMpv2jBA4hURroUwKJqQ5tJmGewZKHYeQ:e:1736704665:1441629160072404:61565975294827:ARbIuACAL-oRtI_VmcE",
      ],
      FILE: [
        "4:ZmlsZXMucG5n:aW1hZ2UvcG5n:ARat49VJvpW5Sid_SD5o3cVo0X8vOTNmGbIu9A-NhYTRVJPQT1db7jIHNDPOyH6NiK0ciL76a9XE3qgVh9AiEjwx1IOMvGpIfSAKvSVgYeLnFw:e:1736704623:1441629160072404:61565975294827:ARawKb_z2TzeBzHi2s0",
      ],
    };

    return handleData[format] || [];
  }

  const handleAddQuickReply = () => {
    if (quickReplies.length < 3) {
      setQuickReplies([...quickReplies, { type: "QUICK_REPLY", text: "" }]);
    }
  };

  const handleRemoveQuickReply = (index) => {
    const updatedReplies = [...quickReplies];
    updatedReplies.splice(index, 1);
    setQuickReplies(updatedReplies);
  };

  const handleQuickReplyChange = (index, field, value) => {
    const updatedReplies = [...quickReplies];
    updatedReplies[index][field] = value;
    setQuickReplies(updatedReplies);
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;

    setTemplateHeader((prevState) => {
      let updatedState = { ...prevState, [name]: value };

      if (name === "format") {
        switch (value) {
          case "TEXT":
            updatedState.text = "";
            delete updatedState.example;
            break;
          case "IMAGE":
          case "VIDEO":
          case "DOCUMENT":
          case "FILE":
            delete updatedState.text;
            updatedState.example = {
              header_handle: generateDynamicHandles(value),
            };
            break;
          default:
            delete updatedState.text;
            delete updatedState.example;
        }
      }

      return updatedState;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTemplateData((prevState) => {
      let updatedButtons = prevState.buttons;

      if (name === "actionType") {
        if (value === "none") {
          updatedButtons = [{ type: "", text: "", phone_number: "", url: "" }];
        } else if (value === "quickAction") {
          updatedButtons = prevState.buttons.map((button) => {
            if (button.type === "phone_number") {
              return { ...button, url: "" };
            } else if (button.type === "url") {
              return { ...button, phone_number: "" };
            }
            return button;
          });
        }
      }

      return {
        ...prevState,
        [name]: value,
        buttons: updatedButtons,
      };
    });
  };
  const extractPlaceholders = (content) => {
    const regex = /{{(\d+)}}/g;
    const matches = [...content.matchAll(regex)];
    return matches.map((match) => parseInt(match[1], 10));
  };

  // Generate example values dynamically
  const generateExampleValues = (content, existingValues = []) => {
    const placeholderIndices = extractPlaceholders(content);

    return placeholderIndices.map(
      (index) => existingValues[index - 1] || "" // Use existing value or default to ""
    );
  };
  const handleContentChange = (e) => {
    const value = e.target.value;
    setTemplateData((prevState) => ({
      ...prevState,
      content: value,
      exampleValues: generateExampleValues(value, prevState.exampleValues),
    }));
  };

  const handleExampleValueChange = (index, value) => {
    const newExampleValues = [...templateData.exampleValues];
    newExampleValues[index] = value;
    setTemplateData((prevState) => ({
      ...prevState,
      exampleValues: newExampleValues,
    }));
  };

  const handleAddButton = () => {
    if (buttons.length < 2) {
      setButtons([
        ...buttons,
        { type: "", text: "", url: "", phone_number: "" },
      ]);
    }
  };

  const handleRemoveButton = (index) => {
    const updatedButtons = [...buttons];
    updatedButtons.splice(index, 1);
    setButtons(updatedButtons);
  };

  const handleButtonChange = (index, field, value) => {
    const updatedButtons = [...buttons];

    if (field === "type") {
      updatedButtons[index].type = value;

      if (value === "URL") {
        delete updatedButtons[index].phone_number;
        updatedButtons[index].url = "";
      } else if (value === "PHONE_NUMBER") {
        delete updatedButtons[index].url;
        updatedButtons[index].phone_number = "";
      }
    } else {
      updatedButtons[index][field] = value;
    }

    setButtons(updatedButtons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingField = Object.entries({
      name: "Template name",
      language: "Language",
      category: "Category",
      content: "Template content",
    }).find(([key]) => !templateData[key]);

    if (missingField) {
      setToast({
        type: "error",
        message: `${missingField[1]} is required.`,
        isVisible: true,
      });
      return;
    }

    const cleanedContent = templateData.content.replace(/[\r\n]+/g, " ").trim();

    const apiBody = {
      name: templateData.name,
      language: templateData.language,
      category: templateData.category,
      components: [],
    };

    // Add header
    if (templateHeader.format) {
      apiBody.components.push(templateHeader);
    }

    // Add body
    if (cleanedContent) {
      const bodyComponent = {
        type: "BODY",
        text: cleanedContent,
      };
      if (templateData.exampleValues.length > 0) {
        bodyComponent.example = { body_text: templateData.exampleValues };
      }
      apiBody.components.push(bodyComponent);
    }

    // Add footer
    if (templateData.footer) {
      apiBody.components.push({
        type: "FOOTER",
        text: templateData.footer,
      });
    }

    // Handle actionType: Buttons or Quick Replies
    if (actionType === "call_to_action" && buttons.length > 0) {
      const buttonComponent = {
        type: "BUTTONS",
        buttons: buttons.map((button) => {
          const buttonObject = {
            type: button.type === "URL" ? "URL" : "PHONE_NUMBER",
            text: button.text,
          };

          if (button.type === "PHONE_NUMBER" && button.phone_number) {
            let cleanedPhone = button.phone_number.replace("+", "").trim();
            if (cleanedPhone.startsWith("91") && cleanedPhone[2] === "0") {
              cleanedPhone = cleanedPhone.slice(0, 2) + cleanedPhone.slice(3);
            }
            buttonObject.phone_number = cleanedPhone;
          }

          if (button.type === "URL" && button.url) {
            buttonObject.url = button.url;
          }

          return buttonObject;
        }),
      };
      apiBody.components.push(buttonComponent);
    } else if (actionType === "quick_replies" && quickReplies.length > 0) {
      const quickReplyComponent = {
        type: "BUTTONS",
        buttons: quickReplies.map((reply) => ({
          type: "QUICK_REPLY",
          text: reply.text,
        })),
      };
      apiBody.components.push(quickReplyComponent);
    }
    try {
      const response = await createTemplate(apiBody).unwrap();
      router.push("/dashboard/template");
      alert("Template created successfully");
    } catch (error) {
      console.error("Error during API call:", error);
      setToast({
        type: "error",
        message: "Error creating template. Please try again.",
        isVisible: true,
      });
    }
  };

  // const handleExampleValueChange = (index, value) => {
  //   const newExampleValues = [...templateData.exampleValues];
  //   newExampleValues[index] = value;
  //   setTemplateData({ ...templateData, exampleValues: newExampleValues });
  // };

  return (
    <div className="flex flex-col h-full w-full">
      <MainHeader title="Create Template">
        <Button size="md" onClick={handleSubmit}>
          {isLoading ? (
            <Spinner size={20} className="text-gray-600" />
          ) : (
            "Save Template"
          )}
        </Button>
      </MainHeader>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5"> */}
      <div className="bg-gray-100 flex justify-between mx-auto p-6 rounded-lg w-full">
        {/* Template Section */}
        <div className="space-y-4 text-gray-700 rounded-lg w-[48%] p-4 bg-white">
          {/* Template Name */}
          <div>
            <label className="text-base font-semibold">Template Name</label>
            <p className="text-xs text-gray-500 mb-2">
              The name should consist only of lowercase letters and underscores.
              Special characters and whitespace are not allowed. For example,
              <strong> &quot;new_template&quot; </strong> is valid, but{" "}
              <strong> &quot;New Template!&quot; </strong> is not.
            </p>
            <input
              name="name"
              value={templateData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 mt-1 w-full text-sm"
              placeholder="Enter template name"
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: <code>my_template_name</code>
            </p>
          </div>

          {/* Template Language */}
          <div>
            <h3 className="text-base font-semibold">Template Language</h3>
            <p className="text-xs text-gray-500 mb-2">
              Choose the language in which the template content will be written.
              This helps ensure that your message is localized and relevant to
              the target audience. For example, select <strong>English</strong>{" "}
              for messages in English, <strong>Hindi</strong> for Hindi, or{" "}
              <strong>Bengali</strong> for Bengali content.
            </p>
            <select
              name="language"
              value={templateData.language}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-gray-100 rounded-md px-3 py-2 mt-1 text-sm"
            >
              <option value="">Choose Language</option>
              <option value="en_US">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Example: Choose <strong>English</strong> for English content,{" "}
              <strong>Hindi</strong> for Hindi, or <strong>Bengali</strong> for
              Bengali content.
            </p>
          </div>

          {/* Template Type */}
          <div>
            <label className="text-base font-semibold">Template Type</label>
            <p className="text-xs text-gray-500 mb-2">
              Choose the type of template you want to create. Each template type
              determines the format of the content that can be used.
            </p>
            <select
              value={templateHeader.format}
              name="format"
              onChange={handleHeaderChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 mt-1 text-sm"
            >
              <option value="">Choose Type</option>
              <option value="TEXT">Text</option>
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
              <option value="DOCUMENT">Document</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              For more information, refer to the template type guidelines.
            </p>
          </div>

          {/* Conditional Header */}
          {templateHeader.format === "TEXT" && (
            <div>
              <h3 className="text-base font-semibold">Template Header</h3>
              <span className="text-xs text-gray-500">Max 60 characters.</span>
              <input
                value={templateHeader.text}
                name="text"
                placeholder="Enter header text"
                onChange={handleHeaderChange}
                maxLength={60}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm"
              />
            </div>
          )}

          {/* Template Content */}
          <div>
            <label className="text-base font-semibold">Template Content</label>
            <p className="text-xs text-gray-500 mb-2">
              Max 1024 characters. You can use placeholders like {"{{1}}"}{" "}
              (e.g., &quot;saket&quot;) and bold text with *like this*.
            </p>

            <textarea
              value={templateData.content}
              onChange={handleContentChange}
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-2 text-sm"
              maxLength={1024}
              rows={6}
              placeholder="Enter message content"
            />
            <p className="text-xs text-gray-500 mt-1">
              {templateData.content.length}/1024 characters
            </p>
          </div>

          {/* Example Values */}
          {templateData.exampleValues.length > 0 && (
            <div>
              <label className="text-lg font-semibold">Example Values</label>
              <p className="text-sm text-gray-500">
                Enter sample values for placeholders.
              </p>
              {templateData.exampleValues.map((value, index) => (
                <div key={index} className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleExampleValueChange(index, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                    placeholder={`Value for {{${index + 1}}}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div>
            <label className="text-base font-semibold">
              Template Footer{" "}
              <span className="text-sm text-gray-500">(Optional)</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Max 60 characters. This text will appear at the bottom of the
              template.
            </p>
            <input
              name="footer"
              value={templateData.footer}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 "
              placeholder="Enter footer text"
            />
          </div>

          {/* Interactive Actions */}
          <div>
            <label className="text-base font-semibold">
              Interactive Actions
            </label>
            <p className="text-xs text-gray-500 mb-3">
              In addition to your message, you can send actions with your
              message. Maximum 25 characters are allowed in CTA buttons and
              quick replies.
            </p>

            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="actionType"
                  value="none"
                  checked={actionType === "none"}
                  onChange={() => {
                    setActionType("none");
                    setButtons([
                      { type: "", text: "", url: "", phone_number: "" },
                    ]);
                    setQuickReplies([{ type: "QUICK_REPLY", text: "" }, F]);
                  }}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">None</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="actionType"
                  value="call_to_action"
                  checked={actionType === "call_to_action"}
                  onChange={() => {
                    setActionType("call_to_action");
                    setQuickReplies([{ type: "QUICK_REPLY", text: "" }]);
                  }}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Call to Actions</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="actionType"
                  value="quick_replies"
                  checked={actionType === "quick_replies"}
                  onChange={() => {
                    setActionType("quick_replies");
                    setButtons([
                      { type: "", text: "", url: "", phone_number: "" },
                    ]);
                  }}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Quick Replies</span>
              </label>
            </div>

            {/* Call to Action Form */}
            {actionType === "call_to_action" && (
              <div className="space-y-4">
                {buttons.map((button, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-md shadow"
                  >
                    <div className="flex space-x-4 items-center">
                      {/* Button Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-500">
                          Button Type
                        </label>
                        <select
                          value={button.type}
                          onChange={(e) =>
                            handleButtonChange(index, "type", e.target.value)
                          }
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-gray-100 text-sm"
                        >
                          <option value="">Select Type</option>
                          <option value="PHONE_NUMBER">Phone Number</option>
                          <option value="URL">URL</option>
                        </select>
                      </div>

                      {/* Button Text */}
                      <div>
                        <label className="block text-sm font-medium text-gray-500">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={button.text}
                          onChange={(e) =>
                            handleButtonChange(index, "text", e.target.value)
                          }
                          placeholder="Enter Text"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-gray-100 text-sm"
                        />
                      </div>

                      {/* Dynamic Field for URL or Phone Number */}
                      {button.type === "URL" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            URL
                          </label>
                          <input
                            type="text"
                            value={button.url}
                            onChange={(e) =>
                              handleButtonChange(index, "url", e.target.value)
                            }
                            placeholder="Enter URL"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-gray-100 text-sm"
                          />
                        </div>
                      )}
                      {button.type === "PHONE_NUMBER" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Phone Number
                          </label>
                          <PhoneNumberInput
                            placeholder="Enter phone number"
                            value={button.phone_number}
                            onChange={(newValue) =>
                              handleButtonChange(
                                index,
                                "phone_number",
                                newValue
                              )
                            }
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-gray-100 text-sm"
                          />
                        </div>
                      )}

                      {/* Add Button */}
                      <div>
                        {buttons.length < 2 && (
                          <button
                            type="button"
                            onClick={handleAddButton}
                            className="mt-5"
                          >
                            <Plus />
                          </button>
                        )}
                      </div>

                      {/* Remove Button */}
                      <div>
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveButton(index)}
                            className="mt-5 text-red-500"
                          >
                            <CancelIcon />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Replies Input Section */}
            {actionType === "quick_replies" && (
              <div className="mt-4 space-y-3">
                {quickReplies.map((reply, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md shadow"
                  >
                    {/* Quick Reply Input */}
                    <input
                      type="text"
                      value={reply.text}
                      onChange={(e) =>
                        handleQuickReplyChange(index, "text", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100"
                      placeholder={`Quick Reply ${index + 1}`}
                      maxLength={25}
                    />

                    {/* Character Count */}
                    <span className="text-xs text-gray-500">
                      {reply?.text?.length}/25
                    </span>

                    {/* Add Quick Reply Button */}
                    {quickReplies.length < 3 &&
                      index === quickReplies.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddQuickReply}
                          className="text-green-500 hover:text-green-700"
                        >
                          <Plus />
                        </button>
                      )}

                    {/* Remove Button */}
                    {quickReplies.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuickReply(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <CancelIcon />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp Preview Section  right secion*/}
        <div className="space-y-4 text-gray-700 rounded-lg w-[48%] p-4 bg-white">
          {/* Template Category */}
          <div>
            <label className="text-base font-semibold">Template Category</label>
            <p className="text-xs text-gray-500 mb-2">
              Select the category that best represents your template. This will
              help organize templates based on their purpose. For example, a
              marketing-related template should be categorized under{" "}
              <strong>Marketing</strong>, while an authentication-related
              template can be placed under <strong>Authentication</strong>.
            </p>
            <select
              name="category"
              value={templateData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-gray-100 rounded-md px-3 py-2 mt-1 text-sm"
            >
              <option value="">Choose Category</option>
              <option value="MARKETING">Marketing</option>
              <option value="UTILITY">Utility</option>
              <option value="AUTHENTICATION">Authentication</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Example: Select &quot;Marketing&quot; for promotional templates or
              &quot;Authentication&quot; for security-related templates.
            </p>
          </div>

          {/* template preview */}
          <div>
            <TemplatePreview
              templateHeader={templateHeader}
              templateData={templateData}
              buttons={buttons}
              quickReplies={quickReplies}
            />
          </div>
        </div>
        {/* Toast Notification */}
        {toast.isVisible && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast({ ...toast, isVisible: false })}
            duration={3000}
          />
        )}
      </div>
    </div>
  );
}
