"use client"
import React, { useEffect, useState } from "react";
import { Dialog,DialogContent,DialogTitle,DialogHeader } from "../../shared/ui/dialog";
import { Input } from "../../shared/ui/input";
import { Textarea } from "../../shared/ui/textarea";
import { Button } from "../../shared/ui/button";


export default function NodeEditorModal({ isOpen, closeModal, node }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (node) {
      setFormData(node.data || {}); // Initialize with node data
    }
  }, [node]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // onSave(node.id, formData); // Update node state in parent
    closeModal();
  };

  console.log("in node editor modal", node);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {node.type} Node</DialogTitle>
        </DialogHeader>
        
        {node.type === "message" && (
          <>
            <label>Message Content</label>
            <Textarea name="message" value={formData.message || ""} onChange={handleChange} />

            <label>Keywords (comma-separated)</label>
            <Input name="keywords" value={formData.keywords || ""} onChange={handleChange} />
          </>
        )}

        {node.type === "userInput" && (
          <>
            <label>Prompt Message</label>
            <Input name="prompt" value={formData.prompt || ""} onChange={handleChange} />

            <label>Expected Response Type</label>
            <select name="responseType" value={formData.responseType || ""} onChange={handleChange}>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
            </select>
          </>
        )}

        {node.type === "singleProduct" && (
          <>
            <label>Product Name</label>
            <Input name="productName" value={formData.productName || ""} onChange={handleChange} />

            <label>Product Description</label>
            <Textarea name="productDesc" value={formData.productDesc || ""} onChange={handleChange} />

            <label>Price</label>
            <Input type="number" name="price" value={formData.price || ""} onChange={handleChange} />
          </>
        )}

        <Button onClick={handleSubmit}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
