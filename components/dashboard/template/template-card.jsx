"use client";
import { Icon } from "@/components/Icon";
import StatusBadge from "@/components/shared/badge/status-badge";
import TooltipButton from "@/components/ui/Tooltip";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
import EditTemplate from "./edit-template";
import Link from "next/link";

export default function TemplateCard({
  id,
  name,
  components,
  status,
  language,
  category,
}) {
  const [openEditPreview, setOpenEditPreview] = useState(false);
  const handlePreview = () => {
    setOpenEditPreview(!openEditPreview);
  };

  return (
    <div className="w-full lg:max-w-64 rounded-lg p-2 border bg-white border-gray-200 shadow-sm flex flex-col justify-between">
      {/* Header Section */}
      <div>
        <div className="flex justify-between items-center text-gray-800 mb-4">
          <p className="text-xs font-meduim">{category}</p>
          <StatusBadge status={status} language={language} />
        </div>

        {/* Components Section */}
        <div className="bg-green-100 py-2 rounded-md space-y-2">
          {components.map((component, idx) => (
            <ComponentRenderer key={idx} component={component} />
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col justify-between mt-2 gap-1">
        <div className="flex justify-between">
          <p className="text-xs text-gray-600">{name}</p>

          <TooltipButton
            tooltipContent="Preview Template"
            className="cursor-pointer"
            position="top"
          >
            <Icon.eye
              className="size-5 text-gray-800 cursor-pointer"
              onClick={handlePreview}
            />
          </TooltipButton>
        </div>{" "}
      </div>
      {openEditPreview && (
        <EditTemplate
          modalopen={openEditPreview}
          id={id}
          closeModal={handlePreview}
        />
      )}
    </div>
  );
}

const ComponentRenderer = ({ component }) => {
  const { type, format, ...rest } = component;

  switch (type) {
    case "HEADER":
      return <HeaderComponent format={format} content={rest} />;
    case "BODY":
      return (
        <div className="bg-green-100 px-3">
          <p className="text-xs font-medium text-gray-800">{component.text}</p>
        </div>
      );
    case "FOOTER":
      return (
        <div className="bg-green-100 px-3">
          <p className="text-xs text-gray-600">{component.text}</p>
        </div>
      );
    case "BUTTONS":
      return (
        <div className="w-full">
          <div className="border-t border-gray-200 my-2"></div>
          {component.buttons.map((button, btnIdx) => (
            <button
              key={btnIdx}
              className="w-full text-sm mt-2 font-medium text-blue-400 bg-green-100 rounded"
              onClick={() =>
                button.type === "FLOW"
                  ? console.log(`Flow ID: ${button.flow_id}`)
                  : console.log(`URL: ${button.url}`)
              }
            >
              {button.text}
            </button>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const HeaderComponent = ({ format, content }) => {
  const [duration, setDuration] = useState(null);

  const handleDuration = (seconds) => {
    setDuration(seconds);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  switch (format) {
    case "TEXT":
      return (
        <div className="bg-green-100 px-2">
          <p className="text-xs font-semibold text-gray-800">{content?.text}</p>
        </div>
      );
    case "IMAGE":
      return (
        <div className="bg-green-100 px-2">
          <Image
            src={content?.example?.header_handle[0] || "/og-image.jpeg"}
            alt="Header Image"
            width={120}
            height={120}
            quality={100}
            className="w-full rounded-md"
            loading="lazy"
          />
        </div>
      );
    case "VIDEO":
      return (
        <div className="relative bg-green-100 px-2 rounded-md overflow-hidden">
          {/* Video Section */}
          <div className="relative w-full aspect-[1/1]">
            {content?.example?.header_handle?.[0] ? (
              <ReactPlayer
                url={content.example.header_handle[0]}
                playing
                loop
                muted
                width="100%"
                height="100%"
                className="rounded-xl"
                onDuration={handleDuration}
                playsinline
              />
            ) : (
              <div className="w-full h-32 flex items-center justify-center bg-gray-200 rounded-md text-gray-500">
                No Video Available
              </div>
            )}
          </div>

          {/* Video Duration */}
          {duration && (
            <div className="absolute top-2 left-4 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              {formatDuration(duration)}
            </div>
          )}
          <div className="absolute bottom-2 right-4 flex items-center">
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              <Icon.play className="text-white size-3" />
            </div>
          </div>
        </div>
      );
    case "DOCUMENT":
      return (
        <div className="bg-green-100 px-2">
          <Link
            href={content?.example?.header_handle[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Document
          </Link>
        </div>
      );
    default:
      return null;
  }
};

// import { Icon } from "@/components/Icon";
// import StatusBadge from "@/components/shared/badge/status-badge";
// import TooltipButton from "@/components/ui/Tooltip";
// import Image from "next/image";

// export default function TemplateCard({
//   name,
//   components,
//   status,
//   language,
//   category,
// }) {
//   return (
//     <div className="w-full lg:max-w-64  rounded-lg p-3 border bg-white border-gray-200 shadow-sm flex flex-col justify-between">
//       {/* Header Section - Template Name */}
//       <div>
//         <div className="flex justify-between items-center text-gray-800 mb-4">
//           <p className="text-xs font-semibold">{category}</p>
//           <StatusBadge status={status} />
//         </div>

//         {/* Body Section - Components */}
//         <div className={"bg-green-100 py-2 rounded-md space-y-2"}>
//           {components.map((component, idx) => {
//              const { type, format, ...rest } = component;
//             switch (component.type) {
//               case "MEDIA":
//                 return (
//                   <div key={idx} className="bg-green-100 px-2 ">
//                     <p className="w-full text-sm font-semibold text-gray-800">
//                       <Image
//                         src="/og-image.jpeg"
//                         width={120}
//                         height={120}
//                         quality={100}
//                         className="w-full rounded-md"
//                       />
//                     </p>
//                   </div>
//                 );
//               case "HEADER":
//                 return <HeaderComponent format={format} content={rest} />
//               case "BODY":
//                 return (
//                   <div key={idx} className="bg-green-100  px-3">
//                     <p className="text-sm font-medium text-gray-800">
//                       {component.text}
//                     </p>
//                   </div>
//                 );
//               case "FOOTER":
//                 return (
//                   <div key={idx} className={`bg-green-100  px-3`}>
//                     <p className="text-xs text-gray-600">{component.text}</p>
//                   </div>
//                 );
//               case "BUTTONS":
//                 return (
//                   <div key={idx} className="w-full">
//                     {component.buttons.map((button, btnIdx) => (
//                       <>
//                         <div className="border-t-[1px] border-gray-200 w-full"></div>
//                         <button
//                           key={btnIdx}
//                           className="w-full text-sm mt-[10px] font-medium text-blue-400 bg-green-100 rounded"
//                           onClick={() =>
//                             button.type === "FLOW"
//                               ? console.log(`Flow ID: ${button.flow_id}`)
//                               : console.log(`URL: ${button.url}`)
//                           }
//                         >
//                           {button.text}
//                         </button>
//                       </>
//                     ))}
//                   </div>
//                 );
//               default:
//                 return null;
//             }
//           })}
//         </div>
//       </div>
//       {/* Status Section */}
//       <div className="flex justify-between mt-4">
//         <p className="text-sm text-gray-600">{language}</p>
//         <TooltipButton tooltipContent={"Preview Template"} position={"top"}>
//           <Icon.eye className="size-5 text-gray-800 cursor-pointer" />{" "}
//         </TooltipButton>
//       </div>
//     </div>
//   );
// }

// const HeaderComponent = ({ format, content }) => {
//   switch (format) {
//     case "TEXT":
//       return (
//         <div className="bg-green-100 px-3">
//           <p className="text-sm font-semibold text-gray-800">{content.text}</p>
//         </div>
//       );

//     case "IMAGE":
//       return (
//         <div className="bg-green-100 px-3">
//           <img
//             src={content.example.header_handle[0]}
//             alt="Header Image"
//             className="w-full h-auto rounded"
//             loading="lazy"
//           />
//         </div>
//       );

//     case "VIDEO":
//       return (
//         <div className="bg-green-100 px-3">
//           <video
//             controls
//             className="w-full h-auto rounded"
//             src={content.example.header_handle[0]}
//           >
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       );

//     case "DOCUMENT":
//       return (
//         <div className="bg-green-100 px-3">
//           <a
//             href={content.example.header_handle[0]}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 underline"
//           >
//             View Document
//           </a>
//         </div>
//       );

//     default:
//       return null;
//   }
// };
