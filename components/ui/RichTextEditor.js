import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  const [editorContent, setEditorContent] = useState(value || "");

  const handleEditorChange = (content) => {
    setEditorContent(content);
    onChange && onChange(content); // Optional callback to parent
  };

  return (
    <ReactQuill
      value={editorContent}
      onChange={handleEditorChange}
      theme="snow" // Can change theme to 'bubble' for different look
      placeholder="Write your content here..."
    />
  );
};

export default RichTextEditor;
