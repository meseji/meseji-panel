import { Icon } from "@/components/Icon";
import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function Video({ videoUrl, onDuration }) {
  const [duration, setDuration] = useState(null);


  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDuration = (value) => {
    setDuration(value);
    if (onDuration) onDuration(value);
  };

  return (
    <>
      {/* Video Section */}
      <div className="relative w-full aspect-[1/1]">
        {videoUrl ? (
          <ReactPlayer
            url={videoUrl}
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
          <div className="w-full h-36 flex items-center justify-center bg-gray-200 rounded-md text-gray-500">
            No Video Available
          </div>
        )}
      </div>

      {/* Video Duration */}
      {duration !== null && formatDuration && (
        <div className="absolute top-2 left-4 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
          {formatDuration(duration)}
        </div>
      )}

      {/* Play Button */}
      <div className="absolute bottom-2 right-4 flex items-center">
        <div className="bg-black bg-opacity-50 rounded-full p-2">
          <Icon.play className="text-white size-3" />
        </div>
      </div>
    </>
  );
};


