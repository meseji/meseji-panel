import React, { useState, useEffect, useRef } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useGetAllTemplateQuery } from "@/lib/features/api/whatsappTemplateApiSlice";
import {
  useCreateCampaignMutation,
  useUploadFileForBroadcastMutation,
} from "@/lib/features/api/whatsappCampaignApiSlice";
import Image from "next/image";
import Video from "../shared/ui/Video";
import SelectDemo from "../shared/selectDemo";
import ModalDialog from "../shared/Dialog";
import { Label } from "../shared/ui/label";
import { Input } from "../shared/ui/input";
import { Icon } from "@/components/Icon";
import Link from "next/link";

export default function BroadCast({ contacts, setContacts }) {
  // LOCAL STATES
  const [isModalOpen, setModalOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [variables, setVariables] = useState({});
  const [approvedTemplates, setApproveTemplates] = useState([]);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const fileInputRef = useRef(null);

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

  // FOR GETTING APPROVED TEMPLATES AND SET IN LOCAL STATES
  useEffect(() => {
    if (getAllTemplates?.data?.apiData?.data.length) {
      const approvedTemplates = getAllTemplates?.data?.apiData?.data.filter(
        (template) => template.status === "APPROVED"
      );
      setApproveTemplates(approvedTemplates);
    }
  }, [getAllTemplates]);

  // HANDLE TEMPLATE CHANGE
  const handleTemplateChange = (tempId) => {
    const findTemaplate = approvedTemplates.find((temp) => temp.id === tempId);
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
      alert("File uploaded successfully!");
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

      const response = await createCampaign(payload).unwrap();

      setModalOpen(false); // Close modal after success
      setCampaignName("");
      setSelectedTemplate({});
      setVariables({});
      setImageUrl(null);
      setContacts([]);
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      setError("Failed to create campaign. Please try again later.");
    }
  };

  const groupedData = approvedTemplates.reduce((acc, item) => {
    const { category, id, name } = item;
    const existingCategory = acc.find((group) => group.category === category);

    if (existingCategory) {
      existingCategory.items.push({ value: id, label: name });
    } else {
      acc.push({
        category,
        items: [{ value: id, label: name }],
      });
    }

    return acc;
  }, []);

  return (
    <>
      <ModalDialog
        title="Broadcast"
        buttonName="Broadcast"
        buttonDisable={contacts.length === 0}
        footerLeftContent={`Selected ${contacts.length} contacts`}
        onAgree={handleCreateCampaign}
        onCancel={() => console.log("Canceled!")}
      >
        <div className="flex gap-4 mt-2">
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
          
            <SelectDemo
              options={groupedData}
              label="Template"
              groupKey="category"
              valueKey="value"
              labelKey="label"
              onChange={handleTemplateChange}
            />

            <div className="mb-3 space-y-1">
              <span className="text-xs text-gray-500">
                Choose a pre-defined template for this campaign.
              </span>
            </div>
            {selectedTemplate?.components?.map(
              (component) =>
                component.type === "HEADER" &&
                component.format !== "TEXT" && (
                  <div key={component.id} className="mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="file">Template Image</Label>
                      <Input
                        id="file"
                        ref={fileInputRef}
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
                        type="file"
                      />
                    </div>
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
                            const variableName = variable.replace(/[{}]/g, "");
                            return (
                              <div key={idx} className="space-y-2">
                                <Label htmlFor="dynamic-input">
                                  {variableName}
                                </Label>
                                <div className="flex rounded-lg shadow-sm shadow-black/5">
                                  <Input
                                    id="dynamic-input"
                                    className="-me-px rounded-e-none shadow-none focus-visible:z-10"
                                    placeholder={`Enter ${variableName}`}
                                    value={variables[variableName] || ""}
                                    onChange={(e) =>
                                      handleVariableChange(
                                        variableName,
                                        e.target.value
                                      )
                                    }
                                    type="text"
                                  />
                                  <div className="relative inline-flex">
                                    <select
                                      value={variables[variableName] || ""}
                                      onChange={(e) =>
                                        handlePredefinedVariableChange(
                                          variableName,
                                          e.target.value
                                        )
                                      }
                                      className="peer inline-flex h-full appearance-none items-center rounded-none rounded-e-lg border border-input bg-background pe-8 ps-3 text-sm text-muted-foreground transition-shadow hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                      aria-label="dynamic suffix"
                                    >
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
                                    <span className="pointer-events-none absolute inset-y-0 end-0 z-10 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
                                      <Icon.down
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                        role="img"
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )
                      : null
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="grid gap-2">
                <Label>Schedule</Label>
                <RadioGroup 
                  value={scheduleType} 
                  onValueChange={setScheduleType}
                  className="grid gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="now" />
                    <Label htmlFor="now">Send immediately</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled">Schedule for later</Label>
                  </div>
                </RadioGroup>

                {scheduleType === "scheduled" && (
                  <div className="grid gap-4 pl-6">
                    <div className="grid gap-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !scheduledDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={scheduledDate}
                            onSelect={setScheduledDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="grid gap-2">
                      <Label>Time</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !scheduledTime && "text-muted-foreground"
                            )}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {scheduledTime || "Pick a time"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-52 p-0">
                          <div className="h-60 overflow-y-auto p-2">
                            {timeOptions.map((timeOption) => (
                              <Button
                                key={timeOption}
                                variant="ghost"
                                className="w-full justify-start font-normal"
                                onClick={() => setScheduledTime(timeOption)}
                              >
                                {timeOption}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="grid gap-2">
                      <Label>Time Zone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}</div> */}
          {/* Right Column */}

          <div className="w-1/2 ">
            {/* // temaplate preview things */}

            <div className="max-w-md">
              <div className="mt-2 bg-green-100 border border-gray-300 rounded-lg">
                {selectedTemplate ? (
                  <div className="flex flex-col space-y-2 py-3">
                    {/* Header */}
                    {selectedTemplate &&
                      selectedTemplate.components &&
                      selectedTemplate?.components?.map((component, index) => {
                        if (component.type === "HEADER") {
                          if (component.format === "TEXT") {
                            return (
                              <div key={index} className="bg-green-100 px-2">
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
                      })}

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
                        if (component.type === "BUTTONS" && component.buttons) {
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
                      placeholder="9999-xxxxxx"
                      className="text-sm w-full py-2 border border-gray-300 rounded-lg shadow-sm"
                    />
                  </div>
                </div>

                {/* Test Button */}
                <div className="self-end">
                  <button className="w-full sm:w-auto py-2 px-4 bg-gray-600 rounded-lg text-white ">
                    Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalDialog>
    </>
  );
}
