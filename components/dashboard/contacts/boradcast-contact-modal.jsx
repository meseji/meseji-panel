import React, { useState, useEffect, useRef } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useGetAllTemplateQuery } from "@/lib/features/api/whatsappTemplateApiSlice";
import {
  useCreateCampaignMutation,
  useUploadFileForBroadcastMutation,
  useTestTemplateMessageMutation,
} from "@/lib/features/api/whatsappCampaignApiSlice";
import Image from "next/image";
import Video from "../shared/ui/Video";
import { Spinner } from "@/components/ui/Spinner";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import Link from "next/link";
export default function BroadCastContactModal({ contacts, setContacts }) {
  // LOCAL STATES
  const [isModalOpen, setModalOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [variables, setVariables] = useState({});
  const [approvedTemplates, setApproveTemplates] = useState([]);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [testContact, setTestContact] = useState("");
  const fileInputRef = useRef(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDetails, setScheduleDetails] = useState({
    date: "",
    time: "",
    timeZone: "Asia/Kolkata",
  });

  // PREDEFINED VARIABLES
  const predefinedVariables = ["{{name}}", "{{company}}"];
  // call rtk query
  const {
    data: getAllTemplates,
    isLoading: loadingAllTemplates,
    refetch: refetchAllTemplates,
  } = useGetAllTemplateQuery();

  const [createCampaign, { isLoading: loadingcampaign }] =
    useCreateCampaignMutation();
  const [uploadFile, { isLoading: loadingFile }] =
    useUploadFileForBroadcastMutation();
  const [sendTestMessage, { isLoading: loadingTestMessage }] =
    useTestTemplateMessageMutation();

  // FOR GETTING APPROVED TEMPLATES AND SET IN LOCAL STATES
  useEffect(() => {
    if (getAllTemplates?.data?.apiData?.data.length) {
      const approvedTemplates = getAllTemplates?.data?.apiData?.data.filter(
        (template) => template.status === "APPROVED"
      );
      
      setApproveTemplates(approvedTemplates);
    }
  }, [getAllTemplates]);
  // MODAL CLOSE AND OPEN FUNCTION
  const toggleModal = () => setModalOpen(!isModalOpen);

  // HANDLE TEMPLATE CHANGE
  const handleTemplateChange = (e) => {
    const templateKey = e.target.value;
    const findTemaplate = approvedTemplates.find(
      (temp) => temp.id === templateKey
    );
    setSelectedTemplate(findTemaplate);
    setVariables({});
  };

  // HANDLE VARIABLE CHANGE
  const handleVariableChange = (key, value) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
  };

  // HANDLE PREDEFINED VARIABLE CHANGE
  const handlePredefinedVariableChange = (variableName, value) => {
    setVariables((prev) => ({
      ...prev,
      [variableName]: value,
    }));
  };

  // REPLACE VARIABLES IN PREVIEW
  const replaceVariablesInPreview = (text) => {
    return text
      .replace(/{(.*?)}/g, (_, variableName) => {
        console.log("Variable:", variableName);
        const cleanedVariableName = variableName.replace(/[{}]/g, "");
        return variables[cleanedVariableName] || `{{${variableName}}}`;
      })
      .replace(/([^\{])}([^\}])/g, "$1$2");
  };

  // handle toggle and set schedule
  const handleToggle = () => {
    setIsScheduled(!isScheduled);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE FILE UPLOAD
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadResponse = await uploadFile(formData).unwrap();
      setImageUrl(uploadResponse?.data?.url);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  const handleCreateCampaign = async () => {
    if (!campaignName) {
      return setError("Please provide a campaign name");
    }
    if (!selectedTemplate?.id) {
      return setError("Please select a template");
    }
    if (!contacts || contacts.length === 0) {
      return setError("Please select contacts");
    }

    setError(null);

    try {
      const formattedContacts = contacts.map((contact) => {
        const formattedComponents = selectedTemplate?.components.reduce(
          (acc, component) => {
            switch (component.type) {
              case "HEADER":
                if (component.format !== "TEXT") {
                  acc.unshift({
                    type: "header",
                    parameters: [
                      {
                        type: "image",
                        image: {
                          link: imageUrl
                            ? imageUrl
                            : component.example.header_handle[0],
                        },
                      },
                    ],
                  });
                }
                break;
              case "BODY":
                acc.push({
                  type: "body",
                  parameters: component?.example?.body_text?.[0]
                    .map((_, i) => {
                      const paramKey = `${i + 1}`;
                      let paramValue = variables?.[paramKey] || `${i + 1}`;

                      if (paramValue.includes("{{name}}")) {
                        paramValue = paramValue.replace(
                          "{{name}}",
                          contact.name
                        );
                      }
                      if (paramValue.includes("{{company}}")) {
                        paramValue = paramValue.replace(
                          "{{company}}",
                          contact.company
                        );
                      }

                      if (paramValue !== ` ${i + 1}` || variables?.[paramKey]) {
                        return {
                          type: "text",
                          text: paramValue,
                        };
                      } else {
                        return null;
                      }
                    })
                    .filter(Boolean),
                });
                break;

              case "BUTTONS":
                component.buttons.forEach((btn, index) => {
                  switch (btn.type) {
                    case "URL":
                      acc.push({
                        type: "button",
                        sub_type: "url",
                        index: `${index + 1}`,
                        parameters: [{ type: "text", text: btn.url }].filter(
                          (param) => param.text || param.url
                        ),
                      });
                      break;

                    case "CALL_NOW":
                      acc.push({
                        type: "button",
                        sub_type: "call_now",
                        index: `${index + 1}`,
                        parameters: [
                          { type: "payload", payload: btn.payload },
                        ].filter((param) => param.payload),
                      });
                      break;

                    case "QUICK_REPLY":
                      acc.push({
                        type: "button",
                        sub_type: "quick_reply",
                        index: `${index + 1}`,
                        parameters: [
                          { type: "payload", payload: btn.text || "Yes" },
                        ].filter((param) => param.payload),
                      });
                      break;

                    default:
                      break;
                  }
                });
                break;

              default:
                break;
            }
            return acc;
          },
          []
        );
        return {
          contact: contact.contact,
          components: formattedComponents,
        };
      });

      // Construct payload
      const payload = {
        campaignName: campaignName,
        templateId: selectedTemplate.id,
        paramsDatas: formattedContacts,
      };

      if (isScheduled && scheduleDetails.date && scheduleDetails.time) {
        payload.schedule = scheduleDetails;
      }

      const response = await createCampaign(payload).unwrap();

      setModalOpen(false);
      setCampaignName("");
      setSelectedTemplate({});
      setVariables({});
      setImageUrl(null);
      setContacts([]);
      setScheduleDetails({
        date: "",
        time: "",
        timeZone: "Asia/Kolkata",
      })
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      setError("Failed to create campaign. Please try again later.");
    }
  };

  const handleTestMessage = async () => {
    if (!testContact) {
      return setError("Please provide a test contact");
    }
    if (!selectedTemplate?.id) {
      return setError("Please select a template");
    }
    setError(null);
    try {
      const formattedComponents = selectedTemplate?.components.reduce(
        (acc, component) => {
          switch (component.type) {
            case "HEADER":
              if (component.format !== "TEXT") {
                acc.unshift({
                  type: "header",
                  parameters: [
                    {
                      type: "image",
                      image: {
                        link: imageUrl
                          ? imageUrl
                          : component.example?.header_handle?.[0],
                      },
                    },
                  ],
                });
              }
              break;

            case "BODY":
              acc.push({
                type: "body",
                parameters: component?.example?.body_text?.[0]
                  .map((_, i) => {
                    const paramKey = `${i + 1}`;
                    let paramValue = variables?.[paramKey] || `${i + 1}`;

                    if (paramValue.includes("{{name}}")) {
                      paramValue = paramValue.replace(
                        "{{name}}",
                        testContact.name
                      );
                    }
                    if (paramValue.includes("{{company}}")) {
                      paramValue = paramValue.replace(
                        "{{company}}",
                        testContact.company
                      );
                    }

                    if (paramValue !== ` ${i + 1}` || variables?.[paramKey]) {
                      return {
                        type: "text",
                        text: paramValue,
                      };
                    } else {
                      return null;
                    }
                  })
                  .filter(Boolean),
              });
              break;

            case "BUTTONS":
              component.buttons.forEach((btn, index) => {
                switch (btn.type) {
                  case "URL":
                    acc.push({
                      type: "button",
                      sub_type: "url",
                      index: `${index + 1}`,
                      parameters: [{ type: "text", text: btn.url }].filter(
                        (param) => param.text || param.url
                      ),
                    });
                    break;

                  case "CALL_NOW":
                    acc.push({
                      type: "button",
                      sub_type: "call_now",
                      index: `${index + 1}`,
                      parameters: [
                        { type: "payload", payload: btn.payload },
                      ].filter((param) => param.payload),
                    });
                    break;

                  case "QUICK_REPLY":
                    acc.push({
                      type: "button",
                      sub_type: "quick_reply",
                      index: `${index + 1}`,
                      parameters: [
                        { type: "payload", payload: btn.text || "Yes" },
                      ].filter((param) => param.payload),
                    });
                    break;

                  default:
                    break;
                }
              });
              break;

            default:
              break;
          }
          return acc;
        },
        []
      );

      const payload = {
        contact: testContact,
        templateId: selectedTemplate.id,
        component: formattedComponents,
      };

      const response = await sendTestMessage(payload).unwrap();
      setTestContact("");
      alert("Test message sent successfully!");
    } catch (error) {
      console.error("Error sending test message:", error);
      setError("Failed to send test message. Please try again later.");
    }
  };

  return (
    <>
      <Button
        size="md"
        variant="outline"
        className="flex items-center"
        disabled={contacts.length === 0}
        onClick={toggleModal}
        icon="zap"
      >
        <span className="hidden lg:flex">Broadcast</span>
      </Button>

      <Modal
        title="Create Campaign"
        isOpen={isModalOpen}
        toggleModal={toggleModal}
      >
        <div className="px-7 py-2 max-w-4xl h-[70vh] overflow-y-auto">
          <div className="flex flex-row justify-between px-2 py-2 rounded-lg mb-2 border-b">
            <h2 className="text-lime-700">
              <span className="text-gray-500 text-sm font-medium mr-1 ">
                Campaign Name
              </span>
              {campaignName}
            </h2>
            <div className="flex items-center text-center space-x-1">
              {[{ label: "Contacts", value: contacts?.length }].map(
                (item, index) => (
                  <div key={index} className="flex flex-row">
                    <p className="text-base mr-1">{item.value}</p>
                    <span className="text-gray-600">{item.label}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <div className="w-1/2 bg-white ">
              <div className="mb-3 space-y-1">
                <label
                  htmlFor="campaignName"
                  className=" text-sm font-medium text-gray-600 ms-1"
                >
                  Campaign Name
                </label>

                <input
                  type="text"
                  value={campaignName}
                  name="campaignName"
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter campaign name"
                  className="block w-full max-w-sm px-4 py-2 font-normal border placeholder-gray-500 leading-relaxed text-gray-800 border-gray-300 shadow-sm rounded-lg text-sm  focus:border-gray-600 focus:ring-gray-700 disabled:opacity-50 "
                />
                <span className="text-xs text-gray-500 ms-1">
                  Enter a unique campaign name.
                </span>
              </div>

              <div className="mb-3 space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Template
                </label>
                <select
                  value={selectedTemplate?.id || ""}
                  onChange={handleTemplateChange}
                  className="mt-2 p-2  block w-full max-w-sm px-4 py-2 font-normal border placeholder-gray-500 leading-relaxed text-gray-800 border-gray-300 shadow-sm rounded-lg text-sm  focus:border-gray-600 focus:ring-gray-700 disabled:opacity-50 "
                >
                  <option value="" disabled>
                    Select a template
                  </option>
                  {approvedTemplates?.map((temp, index) => (
                    <option key={temp?.id} value={temp?.id}>
                      {temp?.name}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-gray-500">
                  Choose a pre-defined template for this campaign.
                </span>
              </div>

              {selectedTemplate?.components?.map(
                (component) =>
                  component.type === "HEADER" &&
                  component.format !== "TEXT" && (
                    <div key={component.id} className="mb-4">
                      <label className="text-sm font-medium text-gray-600">
                        Upload File
                      </label>
                      <div className="relative mt-2">
                        <input
                          type="text"
                          readOnly
                          value={uploadedFileName || ""}
                          placeholder="No file chosen"
                          className="block w-full px-4 py-2 font-normal border placeholder-gray-500 leading-relaxed text-gray-800 border-gray-300 shadow-sm rounded-lg text-sm focus:border-gray-600 focus:ring-gray-700 disabled:opacity-50"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-lg"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={loadingFile}
                        >
                          {loadingFile ? (
                            <Spinner size={20} className="text-gray-600" />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  )
              )}

              <div>
                <div className="grid grid-cols-1 gap-4 mt-4"></div>
                <div>
                  <h6 className="text-sm font-medium text-gray-600">
                    Placeholder Fields
                  </h6>
                  <p className="text-xs text-gray-500">
                    Complete the placeholders below to create your message.
                  </p>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {selectedTemplate?.components?.map((component) =>
                      component.type === "BODY" && component.text
                        ? (component.text.match(/{(.*?)}/g) || []).map(
                            (variable, idx) => {
                              const variableName = variable.replace(
                                /[{}]/g,
                                ""
                              );
                              return (
                                <div key={idx} className="flex flex-col">
                                  <label className="text-xs font-medium text-gray-500">
                                    {variableName}
                                  </label>

                                  <div className="relative">
                                    <input
                                      type="text"
                                      value={variables[variableName] || ""}
                                      onChange={(e) =>
                                        handleVariableChange(
                                          variableName,
                                          e.target.value
                                        )
                                      }
                                      placeholder={`Enter ${variableName}`}
                                      className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                                    />
                                    <select
                                      value={variables[variableName] || ""}
                                      onChange={(e) =>
                                        handlePredefinedVariableChange(
                                          variableName,
                                          e.target.value
                                        )
                                      }
                                      className="absolute right-2 top-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                                    >
                                      <option value="" disabled>
                                        {"{{..}}"}
                                      </option>
                                      {predefinedVariables.map(
                                        (predefinedVar, idx) => (
                                          <option
                                            key={idx}
                                            value={predefinedVar}
                                          >
                                            {predefinedVar}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                </div>
                              );
                            }
                          )
                        : null
                    )}
                  </div>
                </div>
                <div className="mt-4 max-w-md mx-auto bg-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Schedule Campaign
                    </span>
                    <ToggleSwitch
                      checked={isScheduled}
                      onChange={handleToggle}
                    />
                  </div>
                  {isScheduled && (
                    <div className="mt-4 space-y-4">
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm font-small text-gray-600">
                          Select Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={scheduleDetails.date}
                          onChange={handleInputChange}
                          className="block w-full max-w-sm px-4 py-2 font-normal border placeholder-gray-500 leading-relaxed text-gray-800 border-gray-300 shadow-sm rounded-lg text-sm  focus:border-gray-600 focus:ring-gray-700 disabled:opacity-50 "
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm font-small text-gray-600">
                          Select Time
                        </label>
                        <input
                          type="time"
                          name="time"
                          value={scheduleDetails.time}
                          onChange={handleInputChange}
                          className="block w-full max-w-sm px-4 py-2 font-normal border placeholder-gray-500 leading-relaxed text-gray-800 border-gray-300 shadow-sm rounded-lg text-sm  focus:border-gray-600 focus:ring-gray-700 disabled:opacity-50 "
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm font-small text-gray-600">
                          Select Time Zone
                        </label>
                        <select
                          name="timeZone"
                          value={scheduleDetails.timeZone}
                          onChange={handleInputChange}
                          className="block w-full max-w-sm px-4 py-2 font-normal border placeholder-gray-500 leading-relaxed text-gray-800 border-gray-300 shadow-sm rounded-lg text-sm  focus:border-gray-600 focus:ring-gray-700 disabled:opacity-50 "
                        >
                          <option value="UTC">UTC</option>
                          <option value="Asia/Kolkata">
                            Asia/Kolkata (IST)
                          </option>
                          <option value="America/New_York">
                            America/New_York (ET)
                          </option>
                          <option value="America/Los_Angeles">
                            America/Los_Angeles (PT)
                          </option>
                          <option value="Europe/London">
                            Europe/London (GMT/BST)
                          </option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-1/2 ">
              {/* // temaplate preview things */}

              <div className="max-w-md">
                <h6 className="text-sm font-medium text-gray-600">Preview</h6>
                <div className="mt-2 bg-green-100 border border-gray-300 rounded-lg">
                  {selectedTemplate ? (
                    <div className="flex flex-col space-y-2 py-3">
                      {/* Header */}
                      {selectedTemplate &&
                        selectedTemplate.components &&
                        selectedTemplate?.components?.map(
                          (component, index) => {
                            if (component.type === "HEADER") {
                              if (component.format === "TEXT") {
                                return (
                                  <div
                                    key={index}
                                    className="bg-green-100 px-2"
                                  >
                                    <p className="text-sm font-semibold text-gray-800">
                                      {component.text}
                                    </p>
                                  </div>
                                );
                              } else if (component.format === "IMAGE") {
                                return (
                                  <div
                                    key={index}
                                    className="bg-green-100 max-h-40 px-2"
                                  >
                                    <Image
                                      src={
                                        imageUrl ||
                                        component?.example?.header_handle[0]
                                      }
                                      alt="Header Image"
                                      width={220}
                                      height={220}
                                      quality={80}
                                      className="w-full rounded-md"
                                      loading="lazy"
                                    />
                                  </div>
                                );
                              } else if (component.format === "VIDEO") {
                                return (
                                  <div
                                    key={index}
                                    className="relative max-h-36 bg-green-100 px-2 rounded-md overflow-hidden"
                                  >
                                    <Video
                                      src={
                                        component?.example?.header_handle[0] ||
                                        "/og-image.jpeg"
                                      }
                                      onDuration={(duration) =>
                                        console.log("Video duration:", duration)
                                      }
                                    />
                                  </div>
                                );
                              }
                            }
                            return null;
                          }
                        )}

                      {/* Body */}
                      {selectedTemplate &&
                        selectedTemplate.components &&
                        selectedTemplate.components.map((component, index) => {
                          if (component.type === "BODY") {
                            return (
                              // <div
                              //   key={index}
                              //   className="text-sm font-medium text-gray-800 whitespace-pre-wrap"
                              // >
                              //   {replaceVariablesInPreview(component.text)}
                              // </div>
                              <div key={index} className="bg-green-100 px-3">
                                <p className="text-sm font-medium text-gray-800">
                                  {replaceVariablesInPreview(component.text)}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        })}

                      {/* Footer */}
                      {selectedTemplate &&
                        selectedTemplate.components &&
                        selectedTemplate.components.map((component, index) => {
                          if (component.type === "FOOTER") {
                            return (
                              <div key={index} className="bg-green-100 px-3">
                                <p className="text-xs text-gray-600">
                                  {component.text}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        })}

                      {/* Buttons */}

                      {selectedTemplate &&
                        selectedTemplate.components &&
                        selectedTemplate.components.map((component, index) => {
                          if (
                            component.type === "BUTTONS" &&
                            component.buttons
                          ) {
                            return (
                              <div
                                key={index}
                                className="mt-4 space-y-2 border-t border-gray-200 my-2"
                              >
                                {component.buttons.map((button, btnIndex) => (
                                  <div
                                    key={btnIndex}
                                    className="bg-green-100 rounded"
                                  >
                                    {button.type === "QUICK_REPLY" ? (
                                      <button className="w-full text-sm mt-2 font-medium text-blue-400 bg-green-100 rounded">
                                        {button.text}
                                      </button>
                                    ) : button.type === "URL" ? (
                                      <button className="w-full text-sm mt-2 font-medium text-blue-400 bg-green-100 rounded">
                                        <Link
                                          href={button.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <span className="mr-2">🔗</span>
                                          {button.text}
                                        </Link>
                                      </button>
                                    ) : button.type === "PHONE_NUMBER" ? (
                                      <button className="w-full text-sm mt-2 font-medium text-blue-400 bg-green-100 rounded">
                                        <span className="mr-2">📞</span>
                                        {button.text}
                                      </button>
                                    ) : (
                                      <button className="w-full text-sm mt-2 font-medium text-blue-400 bg-green-100 rounded">
                                        {button.text}
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            );
                          }
                          return null;
                        })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Select a template to preview.
                    </p>
                  )}
                </div>
              </div>

              {/* // Test Campaign Section */}
              <div className="py-6 w-full bg-white ">
                <label
                  htmlFor="contact"
                  className="text-sm font-medium text-gray-600"
                >
                  Test
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={testContact}
                        onChange={(e) => setTestContact(e.target.value)}
                        placeholder="9999-xxxxxx"
                        className="text-sm w-full py-2 border border-gray-300 rounded-lg shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Test Button */}
                  <div className="self-end">
                    <button
                      className="w-full sm:w-auto py-2 px-4 bg-gray-600 rounded-lg text-white"
                      onClick={handleTestMessage}
                      disabled={
                        loadingTestMessage ||
                        !selectedTemplate?.id ||
                        loadingcampaign
                      }
                    >
                      {loadingTestMessage ? (
                        <Spinner className="text-gray-600" />
                      ) : (
                        "Test"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* final send button with create and cancle creating campaign */}
        <div className="flex flex-col px-2">
          <div className="flex justify-end items-center gap-x-4">
            {/* Cancel Button */}
            <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300">
              Cancel
            </button>
            {/* Send Now Button */}
            <button
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={handleCreateCampaign}
              disabled={loadingcampaign}
            >
              {loadingcampaign ? (
                <Spinner className="text-white" />
              ) : (
                "Send Now"
              )}
            </button>
          </div>

          {error && (
            <span className="text-red-600 text-sm text-end font-medium my-2 px-2">
              {error}
            </span>
          )}
        </div>
      </Modal>
    </>
  );
}
