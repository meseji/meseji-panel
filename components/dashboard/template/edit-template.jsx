import Modal from "@/components/ui/Modal";
import {
  useGetSingleTemplateQuery,
  useUpdateTemplateMutation,
} from "@/lib/features/api/whatsappTemplateApiSlice";
import React, { useState, useEffect } from "react";
import TemplatePreview from "./template-preview";
import { toast } from "@/components/hooks/use-toast";

const EditTemplate = ({ modalopen, id, closeModal }) => {
  const { data: singleTemplate, isLoading } = useGetSingleTemplateQuery(id);
  const [updateTemplate, { isLoading: isUpdating }] =
    useUpdateTemplateMutation();

  const [templateData, setTemplateData] = useState(null);
  console.log(templateData);

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

  useEffect(() => {
    if (singleTemplate) {
      setTemplateData(singleTemplate?.data);
    }
  }, [singleTemplate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (e) => {
    const value = e.target.value;

    // Extract all placeholder indices from the content text
    const placeholders = [...value.matchAll(/{{(\d+)}}/g)].map((match) =>
      parseInt(match[1])
    );

    // Create or update example values for each placeholder
    const exampleValues = placeholders.map((placeholder) => {
      return (
        templateData?.components?.find((comp) => comp.type === "BODY")?.example
          ?.body_text?.[0]?.[placeholder - 1] || ""
      );
    });

    setTemplateData((prev) => ({
      ...prev,
      components: prev.components.map((component) =>
        component.type === "BODY"
          ? {
              ...component,
              text: value,
              example: { body_text: [exampleValues] },
            }
          : component
      ),
    }));
  };

  const handleExampleValueChange = (index, value) => {
    setTemplateData((prev) => ({
      ...prev,
      components: prev.components.map((component) =>
        component.type === "BODY"
          ? {
              ...component,
              example: {
                body_text: component.example.body_text.map((values, i) =>
                  i === 0
                    ? values.map((v, idx) => (idx === index ? value : v))
                    : values
                ),
              },
            }
          : component
      ),
    }));
  };

  const handleFooterChange = (event, index) => {
    const updatedFooter = event.target.value;
    setTemplateData((prevData) => {
      const updatedComponents = prevData.components.map((component, idx) =>
        idx === index && component.type === "FOOTER"
          ? { ...component, text: updatedFooter }
          : component
      );
      return { ...prevData, components: updatedComponents };
    });
  };

  const handleFormatChange = (e) => {
    const format = e.target.value;
    setTemplateData((prev) => ({
      ...prev,
      components: prev.components.map((comp) =>
        comp.type === "HEADER"
          ? {
              ...comp,
              format,
              ...(format === "TEXT"
                ? { text: "" }
                : {
                    example: { header_handle: generateDynamicHandles(format) },
                  }),
            }
          : comp
      ),
    }));
  };

  const handleHeaderTextChange = (e) => {
    const textValue = e.target.value;
    setTemplateData((prev) => ({
      ...prev,
      components: prev.components.map((comp) =>
        comp.type === "HEADER" ? { ...comp, text: textValue } : comp
      ),
    }));
  };

  const handleButtonChange = (btnIndex, field, value) => {
    setTemplateData((prev) => ({
      ...prev,
      components: prev.components.map((component) =>
        component.type === "BUTTONS"
          ? {
              ...component,
              buttons: component.buttons.map((btn, index) =>
                index === btnIndex ? { ...btn, [field]: value } : btn
              ),
            }
          : component
      ),
    }));
  };

  const handleSave = async () => {
    try {
      await updateTemplate({ id, ...templateData }).unwrap();
      toast("Template updated successfully", "success");
      closeModal();
    } catch (error) {
      console.error("Update Failed:", error);
    }
  };

  if (isLoading) {
    return (
      <Modal title="Edit Template" isOpen={modalopen} toggleModal={closeModal}>
        <div className="flex justify-center items-center h-40">
          <div className="loader">Loading...</div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Edit Template" isOpen={modalopen} toggleModal={closeModal}>
      <div className="flex justify-between items-center p-4 ">
        <h1 className="text-xl font-semibold text-gray-800">
          Edit Template: {templateData?.name}
        </h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md shadow-sm bg-blue-600 text-white"
        >
          Update
        </button>
      </div>
      <div className="max-w-4xl mx-auto  bg-white rounded-lg shadow-lg p-6">
        <div className="flex space-x-6">
          {/* Left Side */}
          <div className="w-1/2 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Template Name
              </label>
              <input
                type="text"
                name="name"
                value={templateData?.name || ""}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Template Language
              </label>
              <select
                name="language"
                value={templateData?.language || ""}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
              >
                <option value="en_US">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
              </select>
            </div>

            {templateData?.components?.map((component, index) => {
              if (component.type === "HEADER") {
                return (
                  <div key={index}>
                    <label className="block text-sm font-semibold text-gray-700">
                      Template Type
                    </label>

                    <select
                      value={component.format || ""}
                      name="format"
                      onChange={handleFormatChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 mt-1 text-sm"
                    >
                      <option disabled value="">
                        Choose Type
                      </option>
                      <option value="TEXT">Text</option>
                      <option value="IMAGE">Image</option>
                      <option value="VIDEO">Video</option>
                      <option value="DOCUMENT">Document</option>
                    </select>

                    {component.format === "TEXT" && (
                      <div className="mt-4">
                        <h3 className="block text-sm font-semibold text-gray-700">
                          Template Header
                        </h3>
                        <span className="text-xs text-gray-500">
                          Max 60 characters.
                        </span>
                        <input
                          value={component.text || ""}
                          name="text"
                          placeholder="Enter header text"
                          maxLength={60}
                          onChange={handleHeaderTextChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                      </div>
                    )}
                  </div>
                );
              }

              if (component.type === "BODY") {
                return (
                  <div key={index}>
                    <label className="block text-sm font-semibold text-gray-700">
                      Template Content
                    </label>
                    <textarea
                      value={component.text}
                      onChange={handleContentChange}
                      className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                      rows={6}
                      placeholder="Enter body content"
                    />
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Example Values
                      </label>
                      {component.example?.body_text?.[0]?.map((value, idx) => (
                        <div key={idx} className="flex items-center mt-2">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              handleExampleValueChange(idx, e.target.value)
                            }
                            className="w-full border rounded-md px-3 py-2 text-sm"
                            placeholder={`Value for {{${idx + 1}}}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              if (component.type === "FOOTER") {
                return (
                  <div key={index}>
                    <label className="block text-sm font-semibold text-gray-700">
                      Template Footer
                    </label>
                    <input
                      value={component.text}
                      onChange={(event) => handleFooterChange(event, index)}
                      className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                      placeholder="Enter footer"
                    />
                  </div>
                );
              }

              if (component.type === "BUTTONS") {
                return (
                  <div key={index}>
                    <label className="block text-sm font-semibold text-gray-700">
                      Buttons
                    </label>
                    {component.buttons.map((button, btnIndex) => (
                      <div
                        key={btnIndex}
                        className="flex items-center space-x-2 mt-2"
                      >
                        <input
                          type="text"
                          value={button.text}
                          onChange={(e) =>
                            handleButtonChange(btnIndex, "text", e.target.value)
                          }
                          className="flex-1 border rounded-md px-3 py-2 text-sm"
                          placeholder="Button text"
                        />
                        {button.type === "URL" && (
                          <input
                            type="text"
                            value={button.url || ""}
                            onChange={(e) =>
                              handleButtonChange(
                                btnIndex,
                                "url",
                                e.target.value
                              )
                            }
                            className="flex-1 border rounded-md px-3 py-2 text-sm"
                            placeholder="Button URL"
                          />
                        )}
                        {button.type === "PHONE_NUMBER" && (
                          <input
                            type="text"
                            value={button.phone_number || ""}
                            onChange={(e) =>
                              handleButtonChange(
                                btnIndex,
                                "phone_number",
                                e.target.value
                              )
                            }
                            className="flex-1 border rounded-md px-3 py-2 text-sm"
                            placeholder="Phone number"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                );
              }

              if (component.type === "QUICK_REPLIES") {
                return (
                  <div key={index}>
                    <label className="block text-sm font-semibold text-gray-700">
                      Quick Replies
                    </label>
                    <div className="flex items-center space-x-2 mt-2">
                      {component.quick_replies.map((reply, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={reply.text}
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                          className="flex-1 border rounded-md px-3 py-2 text-sm"
                          placeholder="Quick reply text"
                        />
                      ))}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Right Side */}
          <div className="w-1/2 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Template Category
              </label>
              <select
                name="category"
                value={templateData?.category || ""}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
              >
                <option value="MARKETING">Marketing</option>
                <option value="UTILITY">Utility</option>
                <option value="AUTHENTICATION">Authentication</option>
              </select>
            </div>
            {templateData && (
              <TemplatePreview
                templateHeader={
                  templateData?.components?.find(
                    (component) => component.type === "HEADER"
                  ) || null
                }
                templateData={
                  templateData?.components?.find(
                    (component) => component.type === "BODY"
                  ) || null
                }
                buttons={
                  templateData?.components?.find(
                    (component) => component.type === "BUTTONS"
                  )?.buttons || []
                }
                quickReplies={
                  templateData?.components?.find(
                    (component) => component.type === "QUICK_REPLIES"
                  )?.quick_replies || []
                }
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditTemplate;
